import {AxiosRequestConfig,AxiosPromise,AxiosResponse} from '../types';
import {parseHeaders} from '../helpers/header';
import {createError} from '../helpers/error';
import {isURLsameOrigin} from '../helpers/url';
import {isFormData} from '../helpers/util'
import cookie from '../helpers/cookie';

export default function xhr(config:AxiosRequestConfig) : AxiosPromise {
    return new Promise((reslove,reject)=> {
        const {
            data = null,
            url,
            method='get',
            timeout,
            headers,
            responseType,
            cancleToken,
            withCredentials,
            xsrfCookieName,
            xsrfHeaderName,
            onDownloadProgress,
            onUploadProgress,
            auth,
            validateStatus,
        } = config;
        const request = new XMLHttpRequest();
        
        request.open(method.toUpperCase(),url!,true);

        configureRequest();

        addEvents();

        processHeaders();

        proccessCancel();

        request.send(data);


        function configureRequest(): void{
            if(responseType) request.responseType = responseType;

            // 超时操作
            if(timeout) request.timeout = timeout;
        
            if(withCredentials) request.withCredentials = withCredentials;
        }

        function addEvents():void{
            
            request.onreadystatechange = function handleLoad() {
                if(request.readyState !== 4) {
                    return;
                }

                if(request.status === 0) {
                    // 网络错误和超时错误时 status为 0
                    return;
                }

                const responseHeaders = parseHeaders(request.getAllResponseHeaders());
                const responseDate = responseType !== 'text' ? request.response : request.responseText;
                const response:AxiosResponse = {
                    data:responseDate,
                    status:request.status,
                    statusText: request.statusText,
                    headers: responseHeaders,
                    config,
                    request,
                }
                handleResponse(response);
            }
 
            // 请求错误
            request.onerror = function handleError() {
                reject(createError('Network Error',config,null,request));
            } 
            // 超时错误
            request.ontimeout = function handleTimeout() {
                reject(createError(`Timeout of ${timeout} ms exceeded`,config,'ECONNABORTED',request));
            }

            if(onDownloadProgress) {
                request.onprogress = onDownloadProgress;
            }        

            if(onUploadProgress) {
                request.upload.onprogress = onUploadProgress;
            }
        }

        function processHeaders():void {
            if(isFormData(data)) {
                delete headers['Content-Type']
            } 
    
            if((withCredentials || isURLsameOrigin(url!)) && xsrfCookieName){
                const xsrfValue = cookie.read(xsrfCookieName);
                if(xsrfValue && xsrfHeaderName) {
                    headers[xsrfHeaderName] = xsrfValue;
                }
            };
            
            if(auth) {
                headers['Authorization'] = 'Basic ' + `${btoa(auth.username)}:${btoa(auth.password)}`;
            }

            Object.keys(headers).forEach((name) => {
                if(data === null && name.toLocaleLowerCase() === 'content-type') {
                    delete headers[name];
                } else {
                    request.setRequestHeader(name,headers[name]);
                }
            })
        }

        function proccessCancel():void {
            if(cancleToken) {
                cancleToken.promise.then(reason => {
                    request.abort()
                    reject(reason)
                })
            }
        }


        function handleResponse(response: AxiosResponse) : void{
            if(!validateStatus || validateStatus(response.status)) {
                reslove(response);
            } else {
                reject(createError(`Request failed with status code ${response.status}`,config,null,request,response));
            }
        }
    })

}