// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["require","exports","./math/common","./math/mat2d","./math/vec2","../../Viewpoint","../../core/promiseUtils","../../core/Error","../../geometry/SpatialReference","../../geometry/Geometry","../../geometry/Point","../../geometry/Extent","../../geometry/support/webMercatorUtils","../../geometry/support/scaleUtils","../../geometry/support/spatialReferenceUtils","../../geometry/support/webMercatorUtils"],function(e,t,r,n,a,o,c,i,u,s,f,l,m,y,g,p){function v(e,t,n){var o=r.toDegree(t[0]/Z);return a.set(e,n?o:o-360*Math.floor((o+180)/360),r.toDegree(.5*Math.PI-2*Math.atan(Math.exp(-1*t[1]/Z))))}function x(e,t){var n=t[1];return n>89.99999?n=89.99999:-89.99999>n&&(n=-89.99999),n=Math.sin(r.toRadian(n)),a.set(e,r.toRadian(t[0])*Z,.5*Z*Math.log((1+n)/(1-n)))}function d(e,t,r,n){return n&&r&&!n.equals(r)&&m.canProject(n,r)&&n.isWebMercator?n.isWebMercator?x(e,t):v(e,t):a.copy(e,t)}function h(e){return e.wkid?e:e.spatialReference||u.WGS84}function M(e,t){return t.type?a.set(e,t.x,t.y):a.copy(e,t)}function R(e){return y.getUnitValueForSR(e)||L}function b(e,t){return Math.max(e.width/t[0],e.height/t[1])*B(e.spatialReference)}function w(e,t,r){var n;if(!e)return null;if(Array.isArray(e)&&2===e.length&&"number"==typeof e[0]&&"number"==typeof e[1])return new f(e);if(e.reduce)return e.reduce(function(e,r){return w(r,t,e)},r);if(e instanceof s?n=e:e.geometry&&(n=e.geometry),!n)return null;var a;if(a="point"===n.type?new l({xmin:n.x,ymin:n.y,xmax:n.x,ymax:n.y,spatialReference:n.spatialReference}):n.extent,!a)return null;var o=m.canProject(a,t);if(!a.spatialReference.equals(t)&&o)a=m.project(a,t);else if(!o)return null;return r=r?r.union(a):a.clone()}function G(e,t){if(!e)return new o({targetGeometry:new f,scale:0,rotation:0});var r=t.spatialReference,n=t.size,c=t.currentViewpoint,i=t.constraints,u=null;"esri.Viewpoint"===e.declaredClass?u=e:e.viewpoint?u=e.viewpoint:e.target&&"esri.Viewpoint"===e.target.declaredClass&&(u=e.target);var l=null;u&&u.targetGeometry?l=u.targetGeometry:e instanceof s?l=e:(e||e&&(e.hasOwnProperty("center")||e.hasOwnProperty("extent")||e.hasOwnProperty("target")))&&(l=w(e.center,r)||w(e.extent,r)||w(e.target,r)||w(e,r)),!l&&c&&c.targetGeometry?l=c.targetGeometry:!l&&t.extent&&(l=t.extent);var m=h(l);if(r||(r=h(t.spatialReference||t.extent||l)),!p.canProject(l,r)&&m&&!m.equals(r))return null;var y=M(a.create(),l.center?l.center:l),g=new f(d(y,y,m,r),r),v=null;v=u&&u.targetGeometry&&"point"===u.targetGeometry.type?u.scale:e.hasOwnProperty("scale")&&e.scale?e.scale:e.hasOwnProperty("zoom")&&-1!==e.zoom&&i&&i.effectiveLODs?i.zoomToScale(e.zoom):Array.isArray(l)||"point"===l.type||"extent"===l.type&&0===l.width&&0===l.height?t.extent?b(t.extent,n):c.scale:b(l.extent,n);var x=0;return u?x=u.rotation:e.hasOwnProperty("rotation")?x=e.rotation:c&&(x=c.rotation),i&&(i.rotationEnabled||(x=0),i.snapToZoom&&(v=i.snapScale(v)),0!==i.effectiveMinScale&&(v=Math.min(i.effectiveMinScale,v)),0!==i.effectiveMaxScale&&(v=Math.max(i.effectiveMaxScale,v))),new o({targetGeometry:g,scale:v,rotation:x})}function S(e,t){var r=e.targetGeometry,n=t.targetGeometry;return r.x=n.x,r.y=n.y,r.spatialReference=n.spatialReference,e.scale=t.scale,e.rotation=t.rotation,e}function P(e,t,r){return r?a.set(e,.5*(t[0]-r.right+r.left),.5*(t[1]-r.bottom+r.top)):a.scale(e,t,.5)}function T(e,r,n,a,o){return t.centerAt(e,r,n.center),e.scale=b(n,a),o&&o.constraints&&o.constraints.constrain(e),e}function A(e,r,a){return t.getTransform(e,r,a),n.invert(e,e)}function z(e,t,r){var n=W(t),o=Math.abs(Math.cos(n)),c=Math.abs(Math.sin(n));return a.set(e,Math.round(r[1]*c+r[0]*o),Math.round(r[1]*o+r[0]*c))}function k(e){return e.scale*O(e.targetGeometry.spatialReference)}function O(e){return 1/(R(e)*F*U())}function W(e){return r.toRadian(e.rotation)||0}function B(e){return R(e)*F*U()}function E(e,t){return a.scale(e,t,.5)}function U(){return 96}function j(e){if(e.isWrappable){var t=g.getInfo(e);return t.valid[1]-t.valid[0]}return 0}function V(e,t){return Math.round(j(e)/t)}function q(e,t){var r=G(e,t);if(r)return c.resolve(r);var n=new i("viewpointUtils-createAsync:different-spatialReference","Target spatialReference cannot be projected and is different from out spatialReference");return c.reject(n)}function I(e,t,r){return k(t)}function C(e,t,r){return S(e,t),e.rotation+=r,e}function D(e,t,r){return S(e,t),e.rotation=r,e}function N(e,t,r){return S(e,t),e.scale=r,e}var F=39.37,L=6370997*Math.PI/180,Z=6378137,H=180/Math.PI;t.create=G,t.copy=S,t.getAnchor=P,t.getExtent=function(){var e=a.create();return function(t,r,n){var a=r.targetGeometry;M(e,a);var o=.5*k(r);return t.xmin=e[0]-o*n[0],t.ymin=e[1]-o*n[1],t.xmax=e[0]+o*n[0],t.ymax=e[1]+o*n[1],t.spatialReference=a.spatialReference,t}}(),t.setExtent=T,t.getOuterExtent=function(){var e=a.create(),t=a.create();return function(r,n,a){M(e,n.targetGeometry),z(t,n,a);var o=.5*k(n),c=e[0]-o*t[0],i=e[1]-o*t[1],u=e[0]+o*t[0],s=e[1]+o*t[1],f=n.targetGeometry.spatialReference;return r.set({xmin:c,ymin:i,xmax:u,ymax:s,spatialReference:f}),r}}(),t.getClippedExtent=function(){var e=a.create(),t=a.create();return function(r,n,a){var o=k(n),c=n.targetGeometry.spatialReference,i=V(c,o);M(e,n.targetGeometry),z(t,n,a),c.isWrappable&&t[0]>i&&(t[0]=i);var u=.5*o,s=e[0]-u*t[0],f=e[1]-u*t[1],l=e[0]+u*t[0],m=e[1]+u*t[1];return r.set({xmin:s,ymin:f,xmax:l,ymax:m,spatialReference:c}),r}}(),t.getOuterSize=z,t.getPaddingScreenTranslation=function(){var e=a.create();return function(t,r,n){return a.sub(t,E(t,r),P(e,r,n))}}();var J=function(){var e=n.create(),r=a.create();return function(o,c,i,u){var s=k(c),f=W(c);return a.set(r,s,s),n.fromScaling(e,r),n.rotate(e,e,f),n.translate(e,e,t.getPaddingScreenTranslation(r,i,u)),n.translate(e,e,[0,u.top-u.bottom]),a.set(o,e[4],e[5])}}();t.getResolution=k,t.getResolutionToScaleFactor=B,t.getMatrix=function(){var e=a.create(),t=a.create(),r=a.create();return function(o,c,i,u,s){return a.negate(e,c),a.scale(t,i,.5),a.set(r,1/u,-1/u),n.identity(o),n.translate(o,o,t),s&&n.rotate(o,o,s),n.scale(o,o,r),n.translate(o,o,e),o}}(),t.getTransform=function(){var e=a.create();return function(r,n,a){var o=k(n),c=W(n);return M(e,n.targetGeometry),t.getMatrix(r,e,a,o,c)}}(),t.getTransformNoRotation=function(){var e=a.create();return function(r,n,a){var o=k(n);return M(e,n.targetGeometry),t.getMatrix(r,e,a,o,0)}}(),t.getWorldWidth=j,t.getWorldScreenWidth=V,t.createAsync=q,t.angleBetween=function(){var e=a.create(),t=a.create(),r=a.create();return function(n,o,c){a.subtract(e,n,o),a.normalize(e,e),a.subtract(t,n,c),a.normalize(t,t),a.cross(r,e,t);var i=Math.acos(a.dot(e,t)/(a.length(e)*a.length(t)))*H;return r[2]<0&&(i=-i),isNaN(i)&&(i=0),i}}(),t.addPadding=function(){var e=a.create();return function(t,r,n,a){var o=t.targetGeometry;return S(t,r),J(e,r,n,a),o.x+=e[0],o.y+=e[1],t}}(),t.removePadding=function(){var e=a.create();return function(t,r,n,a){var o=t.targetGeometry;return S(t,r),J(e,r,n,a),o.x-=e[0],o.y-=e[1],t}}(),t.centerAt=function(){var e=a.create();return function(t,r,n){S(t,r);var a=t.targetGeometry,o=h(n),c=h(a);return M(e,n),d(e,e,o,c),a.x=e[0],a.y=e[1],t}}(),t.pixelSizeAt=I,t.resize=function(){var e=a.create();return function(r,n,o,c,i){i||(i="center"),a.sub(e,o,c),a.scale(e,e,.5);var u=e[0],s=e[1];switch(i){case"center":a.set(e,0,0);break;case"left":a.set(e,-u,0);break;case"top":a.set(e,0,s);break;case"right":a.set(e,u,0);break;case"bottom":a.set(e,0,-s);break;case"top-left":a.set(e,-u,s);break;case"bottom-left":a.set(e,-u,-s);break;case"top-right":a.set(e,u,s);break;case"bottom-right":a.set(e,u,-s)}return t.translateBy(r,n,e),r}}(),t.rotateBy=C,t.rotateTo=D,t.scaleBy=function(){var e=a.create();return function(r,n,o,c,i){return S(r,n),0!==o&&(t.toMap(e,c,n,i),r.scale=n.scale/o,t.toScreen(e,e,r,i),t.translateBy(r,r,a.set(e,e[0]-c[0],c[1]-e[1]))),r}}(),t.scaleTo=N,t.scaleAndRotateBy=function(){var e=a.create();return function(r,n,o,c,i,u){return S(r,n),0!==o&&(t.toMap(e,i,n,u),r.scale=n.scale/o,r.rotation+=c,t.toScreen(e,e,r,u),t.translateBy(r,r,a.set(e,e[0]-i[0],i[1]-e[1]))),r}}(),t.toMap=function(){var e=n.create();return function(t,r,n,o){return a.transformMat2d(t,r,A(e,n,o))}}(),t.toScreen=function(){var e=n.create();return function(r,n,o,c){return a.transformMat2d(r,n,t.getTransform(e,o,c))}}(),t.translateBy=function(){var e=a.create(),t=n.create();return function(r,o,c){S(r,o);var i=k(o),u=r.targetGeometry;return n.fromRotation(t,W(o)),n.scale(t,t,a.fromValues(i,i)),a.transformMat2d(e,c,t),u.x+=e[0],u.y+=e[1],r}}()});