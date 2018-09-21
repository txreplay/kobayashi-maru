var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var baseURL = 'https://newsapi.org/v2';
var apiKey = 'apiKey=16372acce6164cdeb03182ef1912b87c';
var $newsSelector = document.getElementById('news-selector');
var $main = document.querySelector('main');
var defaultSource = 'liberation';
function getAPI(endpoint, params) {
    if (params === void 0) { params = ''; }
    var res = undefined;
    var fullURL = baseURL + "/" + endpoint + "?" + apiKey + "&" + params;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(this.responseText);
        }
    };
    xmlhttp.open("GET", fullURL, false);
    xmlhttp.send();
    return res;
}
function getAllSources() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(baseURL + "/sources?" + apiKey + "&country=fr")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getNewsFromSource(source) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(baseURL + "/everything?" + apiKey + "&sources=" + source)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function putSourcesInSelect(sources) {
    return __awaiter(this, void 0, void 0, function () {
        var i, _a, source;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    i = 0;
                    _b.label = 1;
                case 1:
                    _a = i;
                    return [4 /*yield*/, sources.sources.length];
                case 2:
                    if (!(_a < (_b.sent()))) return [3 /*break*/, 5];
                    return [4 /*yield*/, sources.sources[i]];
                case 3:
                    source = _b.sent();
                    if (source) {
                        $newsSelector.innerHTML += '<option value="' + source['id'] + '">' + source['name'] + '</option>';
                    }
                    _b.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function changeSource() {
    return __awaiter(this, void 0, void 0, function () {
        var articles, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $main.innerHTML = '';
                    return [4 /*yield*/, getNewsFromSource($newsSelector.value)];
                case 1:
                    articles = _b.sent();
                    _a = displayArticles;
                    return [4 /*yield*/, articles];
                case 2: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function displayArticles(articles) {
    return __awaiter(this, void 0, void 0, function () {
        var i, _a, article;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    i = 0;
                    _b.label = 1;
                case 1:
                    _a = i;
                    return [4 /*yield*/, articles.articles.length];
                case 2:
                    if (!(_a < (_b.sent()) - 1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, articles.articles[i]];
                case 3:
                    article = _b.sent();
                    $main.innerHTML += "\n        <article>\n            <figure>\n                <figcaption><h2>" + article.title + "</h2></figcaption>\n                <img src=\"" + article.urlToImage + "\" alt=\"Image de l'article de : " + article.source.name + "\">\n            </figure>\n            <p>" + article.description + "</p>\n            <a href=\"" + article.url + "\" target=\"_blank\" class=\"cta\" rel=\"noreferrer\">Lire la suite</a>\n        </article>\n    ";
                    _b.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
window.addEventListener('load', function () { return __awaiter(_this, void 0, void 0, function () {
    var sources, _a, defaultArticles, _b, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log('Load ok');
                $newsSelector.onchange = function () {
                    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, changeSource()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    }); });
                };
                return [4 /*yield*/, getAllSources()];
            case 1:
                sources = _c.sent();
                _a = putSourcesInSelect;
                return [4 /*yield*/, sources];
            case 2: return [4 /*yield*/, _a.apply(void 0, [_c.sent()])];
            case 3:
                _c.sent();
                $newsSelector.value = defaultSource;
                return [4 /*yield*/, getNewsFromSource(defaultSource)];
            case 4:
                defaultArticles = _c.sent();
                _b = displayArticles;
                return [4 /*yield*/, defaultArticles];
            case 5: return [4 /*yield*/, _b.apply(void 0, [_c.sent()])];
            case 6:
                _c.sent();
                if (!('serviceWorker' in navigator)) return [3 /*break*/, 10];
                _c.label = 7;
            case 7:
                _c.trys.push([7, 9, , 10]);
                return [4 /*yield*/, navigator.serviceWorker.register('./service-worker.js')];
            case 8:
                _c.sent();
                console.log('Service Registered');
                return [3 /*break*/, 10];
            case 9:
                error_1 = _c.sent();
                console.log('Service Registration failed...');
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
