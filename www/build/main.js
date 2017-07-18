webpackJsonp([0],{

/***/ 190:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 190;

/***/ }),

/***/ 232:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 232;

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chart1_chart1__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chart2_chart2__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chart3_chart3__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chart4_chart4__ = __webpack_require__(345);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__chart1_chart1__["a" /* Chart1Page */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__chart2_chart2__["a" /* Chart2Page */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__chart3_chart3__["a" /* Chart3Page */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__chart4_chart4__["a" /* Chart4Page */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\pages\tabs\tabs.html"*/'<ion-tabs>\n <ion-tab [root]="tab1Root" tabTitle="Chart 1" tabIcon="podium"></ion-tab>\n <ion-tab [root]="tab2Root" tabTitle="Chart 2" tabIcon="podium"></ion-tab>\n <ion-tab [root]="tab3Root" tabTitle="Chart 3" tabIcon="podium"></ion-tab>\n <ion-tab [root]="tab4Root" tabTitle="Chart 4" tabIcon="podium"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\pages\tabs\tabs.html"*/
    })
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chart1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_echart_component__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Chart1Page = (function () {
    function Chart1Page() {
        this.option = {
            backgroundColor: ['#394058'],
            title: {
                text: 'Sensor 1a',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,
                data: ['Humidity'],
                right: '4%',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            color: ['#3398DB'],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
                }],
            yAxis: [{
                    type: 'value',
                    name: 'Humidity（%）',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
            series: [
                {
                    name: 'Humidity',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(137,189,27)',
                            borderColor: 'rgba(137,189,2,0.27)',
                            borderWidth: 12
                        }
                    },
                    data: [70, 55, 60, 45, 71, 71, 72, 69, 77, 52, 70, 65]
                }
            ]
        };
    }
    Chart1Page.prototype.ionViewDidEnter = function () {
        this.chart.resize();
    };
    return Chart1Page;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__components_echart_component__["a" /* EChartsComponent */]),
    __metadata("design:type", Object)
], Chart1Page.prototype, "chart", void 0);
Chart1Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-chart1',template:/*ion-inline-start:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\pages\chart1\chart1.html"*/'<!--\n  Chart1 page\n-->\n\n<ion-header>\n <ion-navbar>\n   <ion-title>Chart 1</ion-title>\n </ion-navbar>\n</ion-header>\n\n<ion-content>\n <echart [option]="option"></echart>\n</ion-content>\n'/*ion-inline-end:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\pages\chart1\chart1.html"*/
    })
], Chart1Page);

//# sourceMappingURL=chart1.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chart2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_echart_component__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Chart2Page = (function () {
    function Chart2Page() {
        this.option = {
            legend: {
                data: ['Profit', 'Expenses', 'Income']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value'
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: { show: false },
                    data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                }
            ],
            series: [
                {
                    name: 'Profit',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [200, 170, 240, 244, 200, 220, 210]
                },
                {
                    name: 'Income',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: [320, 302, 341, 374, 390, 450, 420]
                },
                {
                    name: 'Expenses',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                        normal: {
                            show: true,
                            position: 'left'
                        }
                    },
                    data: [-120, -132, -101, -134, -190, -230, -210]
                }
            ]
        };
    }
    Chart2Page.prototype.ionViewDidEnter = function () {
        this.chart.resize();
    };
    return Chart2Page;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__components_echart_component__["a" /* EChartsComponent */]),
    __metadata("design:type", Object)
], Chart2Page.prototype, "chart", void 0);
Chart2Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-chart2',template:/*ion-inline-start:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\pages\chart2\chart2.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Chart 2</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <echart [option]="option"></echart>\n</ion-content>\n'/*ion-inline-end:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\pages\chart2\chart2.html"*/
    })
], Chart2Page);

//# sourceMappingURL=chart2.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chart3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_echart_component__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Chart3Page = (function () {
    function Chart3Page() {
        this.running = false;
        this.interval = null;
        this.option = {
            series: [{
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data: [{ value: 50, name: 'Sensor' }]
                }]
        };
    }
    Chart3Page.prototype.ionViewDidEnter = function () {
        this.chart.resize();
    };
    Chart3Page.prototype.start = function () {
        var _this = this;
        this.running = true;
        this.interval = setInterval(function () {
            _this.option.series[0].data[0].value = Number((Math.random() * 100).toFixed(1));
            _this.chart.setOption(_this.option, true);
        }, 2000);
    };
    Chart3Page.prototype.stop = function () {
        this.running = false;
        clearInterval(this.interval);
    };
    return Chart3Page;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__components_echart_component__["a" /* EChartsComponent */]),
    __metadata("design:type", Object)
], Chart3Page.prototype, "chart", void 0);
Chart3Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-chart3',template:/*ion-inline-start:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\pages\chart3\chart3.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Chart 3</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <echart [option]="option"></echart>\n  <button ion-button block [disabled]="running" (click)="start()" color="secondary">Start</button>\n  <button ion-button block [disabled]="!running" (click)="stop()" color="danger">Stop</button>\n</ion-content>'/*ion-inline-end:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\pages\chart3\chart3.html"*/
    })
], Chart3Page);

//# sourceMappingURL=chart3.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chart4Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_echart_component__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Chart4Page = (function () {
    function Chart4Page() {
        this.option = {
            title: {
                text: 'Graph Example'
            },
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    data: [{
                            name: 'Node 1',
                            x: 300,
                            y: 300
                        }, {
                            name: 'Node 2',
                            x: 800,
                            y: 300
                        }, {
                            name: 'Node 3',
                            x: 550,
                            y: 100
                        }, {
                            name: 'Node 4',
                            x: 550,
                            y: 500
                        }],
                    // links: [],
                    links: [{
                            source: 0,
                            target: 1,
                            symbolSize: [5, 20],
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 5,
                                    curveness: 0.2
                                }
                            }
                        }, {
                            source: 'Node 2',
                            target: 'Node 1',
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            lineStyle: {
                                normal: { curveness: 0.2 }
                            }
                        }, {
                            source: 'Node 1',
                            target: 'Node 3'
                        }, {
                            source: 'Node 2',
                            target: 'Node 3'
                        }, {
                            source: 'Node 2',
                            target: 'Node 4'
                        }, {
                            source: 'Node 1',
                            target: 'Node 4'
                        }],
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                }
            ]
        };
    }
    Chart4Page.prototype.ionViewDidEnter = function () {
        this.chart.resize();
    };
    return Chart4Page;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__components_echart_component__["a" /* EChartsComponent */]),
    __metadata("design:type", Object)
], Chart4Page.prototype, "chart", void 0);
Chart4Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-chart4',template:/*ion-inline-start:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\pages\chart4\chart4.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Chart 4</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <echart [option]="option"></echart>\n</ion-content>'/*ion-inline-end:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\pages\chart4\chart4.html"*/
    })
], Chart4Page);

//# sourceMappingURL=chart4.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(365);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_chart1_chart1__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_chart2_chart2__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_chart3_chart3__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_echart_component__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_chart4_chart4__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(272);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_chart1_chart1__["a" /* Chart1Page */],
            __WEBPACK_IMPORTED_MODULE_6__pages_chart2_chart2__["a" /* Chart2Page */],
            __WEBPACK_IMPORTED_MODULE_7__pages_chart3_chart3__["a" /* Chart3Page */],
            __WEBPACK_IMPORTED_MODULE_9__pages_chart4_chart4__["a" /* Chart4Page */],
            __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_8__components_echart_component__["a" /* EChartsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_chart1_chart1__["a" /* Chart1Page */],
            __WEBPACK_IMPORTED_MODULE_6__pages_chart2_chart2__["a" /* Chart2Page */],
            __WEBPACK_IMPORTED_MODULE_7__pages_chart3_chart3__["a" /* Chart3Page */],
            __WEBPACK_IMPORTED_MODULE_9__pages_chart4_chart4__["a" /* Chart4Page */],
            __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\eagle\SlugSense\SmartIrrigation\echartsapp\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EChartsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_echarts__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_echarts__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EChartsComponent = (function () {
    function EChartsComponent() {
        var _this = this;
        this.resizeListener = function () { return _this.resize(); };
    }
    EChartsComponent.prototype.ngOnInit = function () {
        this.chart = __WEBPACK_IMPORTED_MODULE_1_echarts__["init"](this.root.nativeElement);
        this.chart.setOption(this.option);
        window.addEventListener('resize', this.resizeListener, true);
    };
    EChartsComponent.prototype.ngOnDestroy = function () {
        window.removeEventListener('resize', this.resizeListener);
        this.chart.destroy();
    };
    EChartsComponent.prototype.setOption = function (option, notMerge) {
        this.chart.setOption(option, notMerge);
    };
    EChartsComponent.prototype.resize = function () {
        this.chart.resize();
    };
    return EChartsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('option'),
    __metadata("design:type", Object)
], EChartsComponent.prototype, "option", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('root'),
    __metadata("design:type", Object)
], EChartsComponent.prototype, "root", void 0);
EChartsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'echart',
        template: "<div #root></div>"
    })
], EChartsComponent);

//# sourceMappingURL=echart-component.js.map

/***/ })

},[346]);
//# sourceMappingURL=main.js.map