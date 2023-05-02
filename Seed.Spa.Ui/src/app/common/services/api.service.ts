import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { GlobalService, OperationRequest } from '../../global.service';
import { CacheService } from '../services/cache.service';
import { ECacheType } from '../type-cache.enum';


@Injectable()
export class ApiService<T> {

  private _resource: string;
  private _enableNotifification: boolean;
  private _enableLoading: boolean;
  private _apiDefault: string;
  private _cacheType: ECacheType;
  private _enabledOldBack: boolean;
  private _tokenAuth: string;
  private _tokenAuthAnonymous: string;


  constructor(private http: HttpClient, private notificationsService: NotificationsService, private router: Router) {

    this._apiDefault = GlobalService.getEndPoints().DEFAULT
    this._enableNotifification = true;
    this._enableLoading = true;
    this._cacheType = GlobalService.getAuthSettings().CACHE_TYPE;
    this._enabledOldBack = GlobalService.getGlobalSettings().enabledOldBack;
  }

  public get(filters?: any, onlyDataResult?: boolean): Observable<T> {
    return this.getBase(this.makeBaseUrl(), filters);
  }



  public uploadCustom(formData: FormData, folder: string, url?: string): Observable<any> {

    let _url = url || this.makeBaseUrl();
    let _count = 0;

    this.loading(this.getResource(), true, _count);
    var post = this.http.post<T>(_url, formData, this.requestOptions(false));
    return this.processResponse(post, _count, true, true);

  }

  public upload(file: File, folder: string, rename: boolean): Observable<T> {

    let formData: FormData = new FormData();
    formData.append('files', file, file.name);
    formData.append('folder', folder);
    formData.append('rename', rename ? "true" : "false");

    let url = this.makeUrlUpload();
    return this.uploadCustom(formData, folder, url);
  }

  public deleteUpload(folder: string, fileName: string): Observable<any> {


    let url = this.makeUrlDeleteUpload(folder, fileName);
    let _count = 0;
    this.loading(this.getResource(), true, _count);
    return this.processResponse(this.http.delete(url, this.requestOptions()), _count, true, true);
  }

  public post(data: any, messageCustom?: any): Observable<any> {

    let url = this.makeBaseUrl();
    let _count = 0;
    this.loading(this.getResource(), true, _count);

    var json = JSON.stringify(data, (key, value) => {
      if (value !== null) return value
    });
    return this.processResponse(this.http.post(url, json, this.requestOptions()), _count, true, true);
  }

  public postMany(data: any, messageCustom?: any): Observable<any> {

    var url = this.makeUrlMore();
    let _count = 0;
    this.loading(this.getResource(), true, _count);

    var json = JSON.stringify(data, (key, value) => {
      if (value !== null) return value
    });

    return this.processResponse(this.http.post(url, json, this.requestOptions()), _count, true, true);
  }

  public delete(data: any): Observable<any> {

    let url = this.makeBaseUrl();
    let _count = 0;
    if (data != null && data.id != null) {
      url += '/' + data.id;
    }
    this.loading(this.getResource(), true, _count);
    var ro = Object.assign(this.requestOptions(),(this.makeSearchParams(data)));
    return this.processResponse(this.http.delete(url, ro), _count, true, true);
  }

  public put(data: any): Observable<any> {

    let url = this.makeBaseUrl();
    let _count = 0;
    this.loading(this.getResource(), true, _count);

    var json = JSON.stringify(data, (key, value) => {
      if (value !== null) return value
    });
    return this.processResponse(this.http.put(url, json, this.requestOptions()), _count, true, true);
  }

  public export(filters?: any): Observable<any> {

    if (filters == null) filters = {};
    filters.filterBehavior = 'Export';
    var url = this.makeUrlMore();

    let _count = 0;
    this.loading(this.getResource(), true, _count);

    return this.processResponse(this.http.get(url, Object.assign(this.requestOptionsBlob(),({ params: this.makeSearchParams(filters) }))), _count, true, false);
  }

  public getDataitem(filters?: any): Observable<any> {
    this._enableLoading = false;
    return this.processResponseDataItem(this.getMethodCustom('GetDataItem', filters));
  }

  public getDataListCustom(filters?: any): Observable<T> {
    return this.getMethodCustom('GetDataListCustom', filters);
  }

  public getDetails(filters?: any): Observable<T> {
    return this.getMethodCustom('GetDetails', filters);
  }

  public getDataCustom(filters?: any): Observable<T> {
    return this.getMethodCustom('GetDataCustom', filters);
  }

  public getDataListCustomPaging(filters?: any): Observable<T> {
    return this.getMethodCustom('GetDataListCustomPaging', filters);
  }

  public getFile(file: string): Observable<T> {
    return this.processResponseFile(this.http.get(file));
  }

  public getUrlConfig(more: boolean, filterFieldName?: string, filterBehavior?: string, filters?: any, processResultsCustom?: any, labelInitial?: any) {

    var urlMore = this.makeUrlMore();
    var urlMethod = this.makeGetCustomMethodBaseUrl(filterBehavior);
    var authConfig = this.defaultHeaders();
    var url = this._enabledOldBack ? urlMethod : urlMore;
    var filterNew = filters;

    var processResultsDefault = function (result: any, params) {

      let dataList = result.dataList.map((item: any) => {
        let data = {
          id: item.id,
          text: item.name
        };
        return data;
      });


      if (labelInitial) {
        dataList.unshift({
          id: '',
          text: labelInitial
        });
      }


      if (filterBehavior == "GetDataListCustomPaging") {

        params.page = params.page || 1;

        return {
          results: dataList,
          pagination: {
            more: (params.page * result.summary.pageSize) < result.summary.total
          }
        };

      }

      return {
        results: dataList,
      };


    };

    if (processResultsCustom)
      processResultsDefault = processResultsCustom

    return {
      url: url,
      dataType: 'json',
      headers: authConfig,
      data: function (params: any) {

        var filterComposite = Object.assign(filterNew || {}, {
          filterBehavior: filterBehavior,
        });

        filterComposite["ids"] = null;
        filterComposite[filterFieldName] = params.term;
        filterComposite.pageIndex = params.page || 1;

        return toQueryString(filterComposite);

        function toQueryString(filters) {

          if (filters != null) {
            var queryString = "";

            for (const key in filters) {
              if (key.toLowerCase().startsWith("collection")) {
                if (filters[key]) {
                  let values = filters[key].toString().split(",");
                  var params = "";
                  for (let value in values) {
                    if (values[value])
                      queryString += key + "=" + values[value] + "&";
                  }
                }
              }
              else {
                if (filters[key])
                  queryString += key + "=" + filters[key] + "&";
              }
            }
          }
          return queryString;

        }
      },
      processResults: processResultsDefault

    };
  }

  public enableNotification(enable: boolean): ApiService<T> {
    this._enableNotifification = enable;
    return this;
  }

  public enableLoading(enable: boolean): ApiService<T> {
    this._enableLoading = enable;
    return this;
  }

  public setResource(resource: string, endpoint?: string): ApiService<T> {

    this._resource = resource;
    this._apiDefault = GlobalService.getEndPoints().DEFAULT;

    if (endpoint)
      this._apiDefault = endpoint;

    return this;
  }

  public getResource(): string {

    if (this._resource == null) {
      throw new Error('resource não definido');
    }

    return this._resource;
  }

  public getMethodCustom(method: string, filters?: any): Observable<T> {

    if (filters == null)
      filters = {};

    if (this._enabledOldBack)
      return this.getBase(this.makeGetCustomMethodBaseUrl(method), filters);

    filters.filterBehavior = method;
    return this.getBase(this.makeUrlMore(), filters);

  }

  private getBase(url: string, filters?: any, onlyDataResult?: boolean): Observable<any> {

    if (filters != null && filters.id != null) {
      url += '/' + filters.id;
    }
    let _count = 0;
    this.loading(this.getResource(), true, _count);
    return this.processResponse(this.http.get(url, Object.assign(this.requestOptions(),{ params: this.makeSearchParams(filters) })), _count, false, true);

  }

  private requestOptions(contentType: boolean = true): any {
    return { headers: this.defaultHeaders(contentType) }
  }

  private requestOptionsBlob(contentType: boolean = true):any {
    const headers = new Headers(this.defaultHeaders(contentType));
    return {
      headers: headers,
      //responseType: ResponseContentType.Blob
    };
  }



  private defaultHeaders(contentType: boolean = true) {

    if (contentType)
      return Object.assign(this.HeaderAuth(), this.HeaderContentType());

    return Object.assign(this.HeaderAuth());

  }

  private HeaderAuth() {

    this._tokenAuth = CacheService.get(GlobalService.getAuthSettings().NAME_TOKEN, this._cacheType);
    this._tokenAuthAnonymous = CacheService.get(GlobalService.getAuthSettings().NAME_TOKEN_ANONYMOUS, this._cacheType);

    var TOKEN_AUTH = this._tokenAuthAnonymous || this._tokenAuth;
    
    if (!TOKEN_AUTH) {
      return {};
    }

    if (this._enabledOldBack) {
      return {
        'TOKEN_AUTH': CacheService.get('TOKEN_AUTH', this._cacheType)
      }
    }
    else {
      return {
        'Authorization': "Bearer " + TOKEN_AUTH
      }
    }
  }

  private HeaderContentType() {
    return {
      'Content-Type': 'application/json',
    }
  }



  private makeGetCustomMethodBaseUrl(method: string): string {

    return this.makeBaseUrl() + `/${method}`;

  }

  private makeUrlMore(): string {

    return this.makeBaseUrl() + "/more";

  }

  private makeUrlUpload(): string {

    return this.makeBaseUrl("document");

  }

  private makeUrlDeleteUpload(folder: string, fileName: string): string {

    return this.makeBaseUrl("document") + "/" + folder + "/" + fileName;
  }

  private makeBaseUrl(subDominio?: string): string {
    let url = ``;
    if (subDominio)
      url = `${this._apiDefault}/${subDominio}/${this.getResource()}`;
    else
      url = `${this._apiDefault}/${this.getResource()}`;

    return url;
  }

  private makeSearchParams(filters?: any): HttpParams {
    const params = new HttpParams();
    if (filters != null) {
      for (const key in filters) {

        if (key.toLowerCase().startsWith("collection")) {
          if (filters[key]) {
            let values = filters[key].toString().split(",");
            for (let value in values) {
              params.append(key, values[value]);
            }
          }
        }
        else if (filters.hasOwnProperty(key)) {
          params.set(key, filters[key]);
        }
      }
    }

    return params;
  }

  private successJsonResult(response: Observable<any>): Observable<T> {
    let _response = response
    return _response;
  }

  private successResult(response: any): any {
    return response;
  }

  private errorResult(response: any): Observable<T> {

    if (response.status == 401) {
      this.router.navigate(["/login"]);
    }

    if (response.status == 403) {
      this.router.navigate(["/unauthorized"]);
    }

    let _response = response;
    let erros = "ocorreu um erro!";
    //if (_response.result != null) {
    //  erros = _response.result.errors[0];
    //}

    if (!this._enableNotifification)
      return;

    this.notificationsService.error(
      'Erro',
      erros,
      {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: false,
      }
    )

    return this.riseThrow(erros);

  }

  private notification(response: any, messageCustom: any = null) {

    if (!this._enableNotifification)
      return;

    let _response = response;

    if (_response.warning && _response.warning.warnings && _response.warning.warnings.length > 0) {
      for (var index in _response.warning.warnings) {
        this.notificationsService.warn(
          'Atenção',
          _response.warning.warnings[index],
          {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: false,
          }
        )
      }
    }
    else {

      let msg = "Operação realizado com sucesso!";
      if (_response.result != null) {
        msg = _response.result.message;
      }
      if (messageCustom) {
        msg = messageCustom;
      }

      this.notificationsService.success(
        'Sucesso',
        msg,
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: false,
        }
      )
    }
  }

  private loading(resourceName: string, value: boolean, count: number) {
    if (this._enableLoading || value == false) {
      setTimeout(() => {
        GlobalService.getOperationRequestingEmitter().emit(new OperationRequest(resourceName, count, value));
      }, 150)
    }
  }

  private countReponse(res: any) {
    return res.dataList ? res.dataList.length : res.data ? 1 : 0;
  }


  private processResponse(response: Observable<any>, _count: number, notification: boolean, jsonResult: boolean): Observable<any> {
    return response.pipe(
      map(res => {

        _count = this.countReponse(res);

        if (notification)
          this.notification(res);

        return jsonResult ? this.successJsonResult(res) : this.successResult(res);

      }),
      catchError(error => {
        //console.log(error);
        return this.errorResult(error);
      }),
      finalize(() => {
        this.loading(this.getResource(), false, _count);
      }));
  }

  private processResponseDataItem(response: Observable<T>): Observable<T> {
    return response.pipe(map(res => {
      this._enableLoading = true
      return res;
    }));
  }

  private processResponseFile(response: Observable<any>): Observable<T> {
    return response.pipe(map(res => {
      return res;
    }));
  }

  private riseThrow(erros: any) {
    return throwError(erros);
    //return Observable.throw(erros);
  }

}

//export class CustomQueryEncoder extends QueryEncoder {

//  encodeKey(k: string): string {
//    k = super.encodeKey(k);
//    return k.replace(/\+/gi, '%2B');
//  }
//  encodeValue(v: string): string {
//    v = super.encodeKey(v);
//    return v.replace(/\+/gi, '%2B');
//  }
//}
