let matchStatList = new Map();
let matchGroupList = new Map();
fieldStatRule.forEach(item => {
    matchStatList.set(item.type, item)
});
fieldGroupRule.forEach(item => {
    matchGroupList.set(item.type, item)
});

$(function () {
    let idGlobal = 1000;
    // 使用vue 模板中不能带有script, style 标签
    window.Vue.config.ignoredElements = [
        'ag-horizontal-resize',
        'agHorizontalResize',
    ]
    $('#filterContent').find('script, style').remove();
    new Vue({
        el: '#report',
        mixins: [editTableMixin, segMentMixin, orderMixin],
        data() {
            return {
                aStatList: [], // 纵轴
                aGroupList: [], // 横轴
                aStatField: [],
                aGroupField: [],
                cloneStatList: [],
                cloneStatResult: [], // 存放筛选结果的
                cloneGroupList: [],
                cloneGroupResult: [], // 存放筛选结果的
                canSubmit: true,
                matchStatList: matchStatList,
                matchGroupList: matchGroupList,
                aSelectedStat: [],
                aSelectedGroup: [],
                biCharts: bi.echarts,
                beautyCharts: [],
                activeType: sChartType || '',
                initCreateChart: true,
                dialogVisible: false,
                quotaName: sChartName || '',
                quotaTags: sTag || '',
                preImgSrc: '',
                myData: [],
                gridOptions: {},
                shownumFlag: false,
                cloneList: [],
                // loading: true,
                loading: false,
                beautyChartsCopy: [],
                ajaxLoading: false,
                // ajaxLoading: true,
                aDetailFilters: '',
                firstLoad: true,

                isEditTable: false,
                backUpData: [], // 重置
                tempData: [], // 
                resetModal: false,
                groupRangeObj: {},
                segmentResult: {},

                editBtnTempData: [],
                modifyResultData: [],
                resetBtnType: '',
                delListModal: false,
                aFieldSet: [],
                tempOldValue: '',
                aSegmentInfo: {}
            };
        },
        mounted() {
            this.formPageInit();
            this.$nextTick(() => {
                $('#myform').prepend($('#externalFilter'));
                $('#externalFilter').show();
                $('.page_load_bg').fadeOut('fast');
                caclChartHeight();
                this.chartsTypeInit();
                this.tableInit();
                this.initCreateChart = false;

                // this.createReport();
            });
        },

        methods: {
            formPageInit() {
                let order = $('#order').val();
                if (order) {
                    this.order = JSON.parse(order);
                }


                let modifyData = $('#modifyData').val();
                if (modifyData) {
                    this.modifyResultData = JSON.parse(modifyData);
                }
                this.aSegmentInfo = aSegmentInfo || {};
                this.groupRangeObj = aDefaultSegment || {};

                let segmentResult = $('#segmentResult').val();
                if (segmentResult) {
                    this.segmentResult = JSON.parse(segmentResult);
                }

                this.myData = myData;
                this.aDetailFilters = aDetailFilters;
                if (typeof gridOptions != 'undefined') {
                    this.gridOptions = gridOptions;
                    this.aFieldSet = aFieldSet;
                    this.setGridOptions({
                        aFieldSet: this.aFieldSet,
                        aList: this.myData
                    });
                    this.fieldHelper(this.aFieldSet);
                }

                this.backUpData = JSON.parse(JSON.stringify(this.myData));
                this.tempData = JSON.parse(JSON.stringify(this.myData));

                new SelectAxisHelper();
                this.processingList();
                this.btnInit();
                this.setResultVal();
            },


            fieldHelper(aFieldSet) {
                if (!aFieldSet.length) {
                    return;
                }
                var aGroupField = [];
                var aStatField = [];
                aFieldSet.forEach(item => {
                    if (item.title == 'id') {
                        return
                    }
                    if (item.type == 'stat') {
                        aStatField.push(item);
                    }
                    else if (item.type == 'group') {
                        aGroupField.push(item);
                    }
                });
                aStatField = utils.arrayUnique(aStatField, ['field', 'title']);
                aGroupField = utils.arrayUnique(aGroupField, ['field', 'title']);
                console.log('aStatField1', aStatField);
                console.log('aGroupField', aGroupField);
                // return
                this.aStatField = aStatField;
                this.aGroupField = aGroupField;
            },

            processingList() { // 纵轴
                aStatList.forEach((item, index) => {
                    let { field, rule, title } = item;
                    item['text'] = item.field + '|' + item.title;
                });

                aGroupList.forEach((item, index) => {
                    let { field, rule, title } = item;
                    item['text'] = item.field + '|' + item.title;
                });

                this.aStatList = aStatList;
                this.aGroupList = aGroupList;

                this.aSelectedStat = aSelectedStat;
                this.aSelectedGroup = aSelectedGroup;


                this.cloneStatList = JSON.parse(JSON.stringify(this.aStatList));
                this.cloneGroupList = JSON.parse(JSON.stringify(this.aGroupList));

                this.cloneList = [...this.cloneStatList, ...this.cloneGroupList];

                if (this.aSelectedStat.length) {
                    this.setSelectVal(aSelectedStat, this.cloneList, this.cloneStatResult, 'stat');
                }

                if (this.aSelectedGroup.length) {
                    this.setSelectVal(aSelectedGroup, this.cloneList, this.cloneGroupResult, 'group');
                }
            },

            setSelectVal(secList, cloneList, resultList, type) {

                secList.forEach((sec, index) => {
                    let current = cloneList.find((clone) => {
                        let arr = sec.split('|');
                        let newSec = arr[0] + '|' + arr[1];
                        return newSec == clone.text;
                    });
                    if (current) {
                        let exitVal = this.assignSecval(type, current.type, sec.split('|')[2]);
                        let newCurrent = JSON.parse(JSON.stringify(current));
                        newCurrent['ruleType'] = type;
                        if (exitVal) {
                            let { label, value } = exitVal;
                            newCurrent['funLabel'] = label;
                            newCurrent['funVal'] = value;
                        }
                        resultList.push(newCurrent);
                    }
                });
            },

            assignSecval(type, ruleType, matchFun) {
                let matchList = {};
                if (type == 'stat') {
                    matchList = this.matchStatList;
                }
                else if (type == 'group') {
                    matchList = this.matchGroupList;
                }

                let ruleList = matchList.get(ruleType);
                if (ruleList) {
                    let obj = ruleList.list.find(item => {
                        return item.value == matchFun;
                    });

                    if (obj) {
                        return obj;
                    }
                    else {
                        return ruleList.list[0];
                    }

                }
                return '';
            },

            getHelper(type) {
                if (type == 'number') {
                    return `iconfont iconiconjing`;
                }
                else if (type == 'string') {
                    return `iconfont iconT`;
                }
                else if (type == 'date') {
                    return `iconfont iconriqi2`;
                }
            },

            getIconType(item) {
                let { type } = item;
                if (type == 'segment') {
                    let { originType } = item;
                    return this.getHelper(originType);
                }
                return this.getHelper(type)
            },

            setResultVal() {
                var groupVal = [];
                var statVal = [];
                this.segmentResult = {};
                if (this.cloneGroupResult.length) {
                    groupVal = this.cloneGroupResult.map(item => {
                        if ('segmentType' in item) {
                            this.setRangeResult(item);
                            return `${item.text}|${item.funVal}|${item.segmentType}`

                        }
                        return `${item.text}|${item.funVal}`
                    });
                }
                if (this.cloneStatResult.length) {
                    statVal = this.cloneStatResult.map(item => {
                        if ('segmentType' in item) {
                            this.setRangeResult(item);
                            return `${item.text}|${item.funVal}|${item.segmentType}`

                        }
                        return `${item.text}|${item.funVal}`
                    });
                }

                $('#group-val').val(groupVal.join(','));
                $('#stat-val').val(statVal.join(','));

                $('#quotaName').val(this.quotaName);
                $('#quotaTags').val(this.quotaTags);
                $('#preImg').val(this.preImgSrc);
                $('#sChartType').val(this.activeType);

                $('#order').val(JSON.stringify(this.sortSelected));
                // $('#groupRange').val(JSON.stringify(this.groupRangeObj));
                $('#segmentResult').val(JSON.stringify(this.segmentResult));

                $('#modifyData').val(JSON.stringify(this.modifyResultData));
            },
            setRangeResult(item) {
                let { field, title, segmentType, funVal, rangeType, template, ruleType, aId = -1 } = item;
                let currentList = this.groupRangeObj[field];
                if (!(field in this.segmentResult)) {
                    this.segmentResult[field] = JSON.parse(JSON.stringify(currentList));
                    this.segmentResult[field].group = [];
                    this.segmentResult[field].custom = [];
                }
                if (template) {
                    this.segmentResult[field].group.unshift({
                        name: title,
                        groupRange: this.groupRangeObj[field]['groupRange'],
                        firstSplitPoint: this.groupRangeObj[field]['firstSplitPoint'],
                        rule: funVal,
                        type: ruleType,
                        aId
                    });
                }
                else {
                    let list = currentList[rangeType];
                    let target = list.find(range => {
                        return aId == range.aId
                    });

                    if (target) {
                        let seg = Object.assign(target, { rule: funVal, type: ruleType });
                        this.segmentResult[field][rangeType].push(seg)
                    }
                }
            },

            setTemplateRange(item) {
                let { field, title, segmentType } = item;
                this.groupRangeObj[field]['group'].unshift({
                    name: title,
                    groupRange: aDefaultSegment[field]['groupRange'],
                    firstSplitPoint: aDefaultSegment[field]['firstSplitPoint']
                });
            },

            createReport() {
                this.loading = true;
                let _this = this;
                this.setResultVal();
                if (!this.cloneGroupResult.length && !this.cloneStatResult.length) {
                    this.activeType = 'table';
                }

                // 记录数据更新各 chart点击状态
                _this.beautyChartsCopy = JSON.parse(JSON.stringify(_this.beautyCharts));
                $('#myform').attr('action', createAction);
                let data = $("#myform").serialize();
                if (this.firstLoad) {
                    if (this.aDetailFilters) {
                        data = data + '&' + this.aDetailFilters
                    }
                }
                this.ajaxLoading = true;
                this.firstLoad = false;
                $.ajax({
                    url: `/dai/customanalyse/createChart`,
                    method: 'post',
                    data: data,
                    dataType: "json",
                    timeout: 15000,
                    success: function (res) {
                        _this.ajaxLoading = false;
                        _this.canSubmit = true;
                        _this.loading = false;
                        _this.isEditTable = false;
                        if (res.status) {
                            _this.fieldHelper(res.data.aFieldSet);
                            _this.myData = res.data.aList;
                            _this.order = res.data.order;
                            _this.aSegmentInfo = res.data.aSegmentInfo;
                            _this.backUpData = JSON.parse(JSON.stringify(_this.myData));
                            _this.tempData = JSON.parse(JSON.stringify(_this.myData));
                            _this.setGridOptions(res.data);
                            if (_this.activeType == 'table' || !_this.activeType) {
                                _this.setTable();
                            }
                            else {
                                _this.createChart();
                            }
                        }
                        else {
                            _this.errorFun();
                        }
                    },
                    error: function (res) {
                        _this.ajaxLoading = false;
                        _this.canSubmit = true;
                        _this.loading = false;
                        _this.isEditTable = false;
                        _this.errorFun();
                    }
                });
            },

            errorFun() {
                let errorData = {
                    aFieldSet: [],
                    aList: [],
                    aSelectedGroup: [],
                    aSelectedStat: [],
                }
                this.aSegmentInfo = [];
                this.sortSelected = [];
                this.sortUnSelected = [];
                this.setGridOptions(errorData);
                this.activeType == 'table';
                this.setTable();
            },

            setGridOptions(data) {
                let columnDefs = [];
                let { aFieldSet, aList } = data;
                this.aFieldSet = aFieldSet;
                columnDefs = aFieldSet.map(item => {
                    let headerName = item.title;
                    let field = item.title;
                    let enableRowGroup = true;
                    let enableValue = item.type == 'stat';
                    let type = item.type == 'stat' ? 'numericColumn' : '';
                    let maxWidth = 300;
                    let minWidth = 80;
                    // let cellEditor = 'agLargeTextCellEditor'; // 出现编辑框弹层
                    return {
                        headerName,
                        field,
                        enableRowGroup,
                        enableValue,
                        type,
                        maxWidth,
                        minWidth,
                    }
                });

                let spliceIndex = columnDefs.findIndex(item => {
                    return item.field == 'id';
                });
                if (spliceIndex != -1) {
                    columnDefs.splice(spliceIndex, 1);
                }
                Object.assign(this.gridOptions, { columnDefs, rowData: this.myData, onCellValueChanged: this.onCellValueChanged });
            },

            inputFun(e) {
                let val = e.target.value.trim();
                let searchLabels = $('.report_select_list').find('.select_show_name');
                searchLabels.each((index, item) => {
                    let text = $(item).text();
                    if (text.indexOf(val) != -1) {
                        $(item).parents('.report_select_item').parent().show();
                    }
                    else {
                        $(item).parents('.report_select_item').parent().hide();
                    }
                })
            },

            btnInit() {
                let _this = this;
                $('#generateChartsBtn').on('click', function () { // 生成图表按钮
                    if (_this.ajaxLoading) {
                        return;
                    }
                    if (!_this.cloneGroupResult.length && !_this.cloneStatResult.length) {
                        this.activeType = 'table';
                        _this.$message({
                            message: '请选择指标数值',
                            type: 'error',
                            duration: 1000
                        });
                        return;
                    }

                    if (_this.modifyResultData.length) {
                        _this.resetModal = true;
                        _this.resetBtnType = "createChart";
                        return;
                    }

                    if (_this.isEditTable) {
                        _this.$message({
                            message: '请先确认或取消修改的数据',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                    _this.createReport();
                });
            },

            submitReportInit() {
                let _this = this;
                if (!_this.canSubmit) {
                    _this.$message({
                        message: '请点击生成图表',
                        type: 'error',
                        duration: 1000
                    });
                    return false;
                }
                if (!_this.myData.length) {
                    _this.$message({
                        message: '无结果，请重新设置横纵轴',
                        type: 'error',
                        duration: 1000
                    });
                    return false;
                }

                _this.dialogVisible = true;
                var tabEl = '';
                if (_this.activeType == 'table') {
                    tabEl = document.getElementById('tab-table');
                }
                else {
                    tabEl = document.getElementById('tab-chart');
                }
                html2canvas(tabEl).then(canvas => {
                    let img = canvas.toDataURL("image/jpeg"); // base64 编码
                    let data = window.atob(img.split(",")[1]);
                    let ia = new Uint8Array(data.length);
                    for (let i = 0; i < data.length; i++) {
                        ia[i] = data.charCodeAt(i);
                    }
                    var blob = new Blob([ia], { type: "image/png" });
                    var fd = new FormData();
                    fd.append('file', blob);

                    $.ajax({
                        url: global.sUploadUrl,
                        method: 'post',
                        data: fd,
                        dataType: "json",
                        timeout: 15000,
                        processData: false,
                        contentType: false,
                        success: function (res) {
                            if (res.file) {
                                _this.preImgSrc = res.file.sFile;
                            }
                        },
                    });
                });
            },

            submitReport() {
                if (!this.quotaName) {
                    this.$message({
                        message: '请输入指标名称',
                        type: 'error',
                        duration: 2000
                    });
                    return;
                }

                if (this.quotaTags) {
                    let result = this.checkTas();
                    if (!result) {
                        this.$message({
                            message: '最多可设置3个标签，每个标签最多10个字符串',
                            type: 'error',
                            duration: 2000
                        });
                        return;
                    }
                    this.quotaTags = result;
                }

                this.setResultVal();
                $('#myform').attr('action', addAction);
                let data = $("#myform").serialize();
                let _this = this;
                $.ajax({
                    url: `${addAction}`,
                    method: 'post',
                    data: data,
                    dataType: "json",
                    timeout: 15000,
                    success: function (res) {
                        if (res.status) {
                            _this.dialogVisible = false;
                            _this.$message({
                                message: '图表已保存至指标看板',
                                type: 'success',
                                duration: 1000,
                                onClose: function () {
                                    $('#jumpInitUrl').submit();
                                }
                            });
                        }
                        else {
                            $('#myform').attr('action', createAction);
                            $('#myform').submit();
                        }
                    },
                    error: function (res) {
                        $('#myform').attr('action', createAction);
                        $('#myform').submit();
                    },

                });
            },

            checkTas() {
                let arr = this.quotaTags.split(' ');
                let newArr = arr.filter(item => {
                    return item;
                });
                let len = newArr.length;
                if (len > 3) {
                    return false;
                }
                let flag = newArr.every(item => {
                    return item.length <= 10;
                });

                if (!flag) {
                    return false;
                }

                return newArr.join(' ')
            },

            findFun(field, type, chartType) {
                let matchList = this.getMatchList(type, chartType);
                if (matchList) {
                    let current = matchList.list.find((item) => {
                        return item.value == field
                    });
                    return current ? current : matchList.list[0];
                }
                return ''
            },

            findList(type, chartType) {
                let matchList = this.getMatchList(type, chartType);
                if (matchList) {
                    return matchList.list
                }
                return []
            },

            getMatchList(type, chartType) {
                let matchList = null;
                if (chartType == 'stat') {
                    matchList = this.matchStatList.get(type);
                }
                else if (chartType == 'group') {
                    matchList = this.matchGroupList.get(type);
                }
                return matchList;
            },

            setLabel(item, listType, elKey, pElement) {
                this.canSubmit = false;
                let { label, value } = item;
                let list = []
                if (listType == 'stat') {
                    list = this.cloneStatResult;
                }
                else if (listType == 'group') {
                    list = this.cloneGroupResult;
                }
                let newElement = Object.assign({}, { ...list[elKey] }, {
                    funLabel: label,
                    funVal: value
                });

                if (listType == 'stat') {
                    if (label == '不计算') {
                        setOtherVal.call(this, '不计算');
                    };

                    if (pElement.funLabel == '不计算' && label != '不计算') {
                        setOtherVal.call(this, '计算');
                    }

                    function setOtherVal(calcType) {
                        this.cloneStatResult.forEach((stat, index) => {
                            let type = stat.type;
                            // 
                            let obj = this.matchStatList.get(type);
                            if (obj) {
                                let len = obj.list.length;
                                let pos = calcType == '不计算' ? len - 1 : 0;
                                let list = obj.list[pos];
                                stat.funLabel = list.label;
                                stat.funVal = list.value;
                            }
                        });
                    }
                }
                this.$set(list, elKey, newElement);
            },

            delSelf(key, type) {
                this.canSubmit = false;
                if (type == 'stat') {
                    this.cloneStatResult.splice(key, 1);
                }
                else if (type == 'group') {
                    this.cloneGroupResult.splice(key, 1);
                }
                this.chartsTypeInit();
            },

            clearList(type) {
                this.canSubmit = false;
                if (type == 'stat') {
                    this.cloneStatResult = [];
                }
                else if (type == 'group') {
                    this.cloneGroupResult = [];;
                }
                this.chartsTypeInit();
            },


            clone(item) {
                return { ...item, id: idGlobal++ };
            },

            onEnd(e) {
                let toDom = e.to;
                let { newIndex } = e;
                let dataType = toDom.getAttribute('data-type') || '';
                if (!dataType) {
                    this.stopDrag(e);
                }
                this.newFilterResult(dataType, newIndex);
                this.canSubmit = false;
            },

            stopDrag(e) {
                let { oldIndex, newIndex } = e;
                let current = this.cloneList[newIndex];
                let { type } = current;
                if (type == 'segment') {
                    let passiveItem = this.cloneList[oldIndex];
                    this.cloneList.splice(newIndex, 1);
                    this.cloneList.splice(oldIndex, 0, current);
                }
            },

            newFilterResult(dataType, newIndex) {
                if (!dataType) {
                    return;
                }

                let currentList = [];
                let checkList = []

                if (dataType == 'stat') {
                    currentList = this.cloneStatResult;
                    checkList = this.cloneGroupResult;
                }
                else if (dataType == 'group') {
                    currentList = this.cloneGroupResult;
                    checkList = this.cloneStatResult;
                }

                this.addRuleType();
                // if (!checkList.length) {
                //     this.chartsTypeInit();
                //     return;
                // }

                let element = currentList[newIndex];

                let isExit = checkList.find(item => {
                    // return item.field == element.field;
                    return item.text == element.text;
                });
                if (isExit) {
                    let tip = dataType == 'stat' ? '横轴' : '纵轴'
                    this.$message({
                        message: `相同字段,${tip}已添加`,
                        type: 'error',
                        duration: 1000
                    });
                    currentList.splice(newIndex, 1);
                    return;
                }

                if (element.type == 'segment') {
                    let exitSegment = this.checkOnlySetment(currentList, checkList, newIndex);
                    if (exitSegment) {
                        this.$message({
                            message: `无法再添加分段字段`,
                            type: 'error',
                            duration: 1000
                        });
                        currentList.splice(newIndex, 1);
                        return;
                    }
                }

                this.chartsTypeInit();
            },

            checkOnlySetment(currentList, checkList, newIndex) {
                let element = currentList[newIndex];
                let exitGroup = currentList.some((item, index) => {
                    if (index != newIndex) {
                        return item.type == 'segment';
                    }
                    return false;
                });
                let exitStat =checkList.some(item => {
                    return item.type == 'segment';
                });

                return exitGroup || exitStat;
            },

            addRuleType() {
                this.cloneStatResult.forEach((item, index) => {
                    if (item['ruleType'] != 'stat') {
                        item['ruleType'] = 'stat';
                        let assignVal = this.assignSecval('stat', item.type, 'noMatchField');
                        let { label, value } = assignVal;
                        let newItem = Object.assign({}, item, { funLabel: label, funVal: value });
                        this.$set(this.cloneStatResult, index, newItem);
                    }
                });

                this.cloneGroupResult.forEach((item, index) => {
                    if (item['ruleType'] != 'group') {
                        item['ruleType'] = 'group';
                        // 获取对应的规则
                        let assignVal = this.assignSecval('group', item.type, 'noMatchField');
                        let { label, value } = assignVal;
                        let newItem = Object.assign({}, item, { funLabel: label, funVal: value });
                        this.$set(this.cloneGroupResult, index, newItem);
                    }
                });
            },

            chartsTypeInit() { // 初始化并且检测icon点击状态
                let arr = []
                Object.keys(this.biCharts).forEach((key) => {
                    let o = { chartName: key, ...this.biCharts[key] };
                    this.getChartType(o);
                    arr.push(o);
                });
                this.beautyCharts = arr;
                if (this.initCreateChart) {
                    this.beautyChartsCopy = JSON.parse(JSON.stringify(this.beautyCharts));
                }
                if (this.activeType && this.activeType != 'table') {
                    let current = this.beautyCharts.find(item => {
                        return item.chartName == this.activeType
                    });
                    if (current && current.canClick) {
                        this.activeType = current.chartName;
                        this.setChart(current);
                        return;
                    }
                    else {
                        current = this.beautyCharts.find(item => {
                            return item.chartName == 'line';
                        });
                        if (current && current.canClick) {
                            this.activeType = current.chartName;
                            this.setChart(current);
                            return;
                        }
                    }
                    this.setTable();
                }
            },

            getChartType(item) {
                let { limit } = item;
                let statFlag = this.checkChartClick(limit[1], this.cloneStatResult); // 检查纵轴
                let groupFlag = this.checkChartClick(limit[0], this.cloneGroupResult); // 检查横轴
                if (!item['href']) {
                    item['href'] = 'tab-chart';
                }
                if (!item['tooltip']) {
                    item['tooltip'] = this.createChartTip(item);
                }
                if (!statFlag || !groupFlag) {
                    let { icon } = item;
                    item['icon'] = icon.slice(0, icon.length - 1);
                    item['canClick'] = false;
                    return
                }
                item['canClick'] = true;
            },

            createChartTip(item) {
                let { limit, title } = item;
                return `
                    ${title}: ${this.tipHelper(limit[1])}数值,${this.tipHelper(limit[0])}维度
                `
            },

            tipHelper(limit) {
                let [first, last] = limit;
                let tip = '';
                if (first == last) {
                    tip = `${first}个`;
                }
                else if (last == 99) {
                    tip = `${first}或多个`;
                }
                else {
                    tip = `${first}-${last}个`;
                }
                return tip;
            },

            checkChartClick(limit, list) {
                if (!list.length) {
                    return false
                }
                let len = list.length;
                if (len >= limit[0] && len <= limit[1]) {
                    return true;
                } 
                return false
            },

            setChart(item) {
                if (this.isEditTable) {
                    this.$message({
                        message: '表格编辑中，暂时无法切换',
                        type: 'error',
                        duration: 1000
                    });
                    return;
                }
                if (!item['canClick']) {
                    return;
                }
                if (this.ajaxLoading) {
                    return
                }
                if (this.activeType == 'table') {
                    setTimeout(() => {
                        caclChartHeight();
                    }, 10);
                }
                this.activeType = item.chartName;
                this.createChart();
            },

            createChart() {
                if (!this.canSubmit) {
                    let flag = this.beautyChartsCopy.some(item => {
                        return item.canClick;
                    });
                    if (!flag) {
                        if (myChart) {
                            echarts.dispose(myChart);
                        }
                        return;
                    }
                }
                if (!this.myData.length) {
                    if (myChart) {
                        echarts.dispose(myChart);
                    }
                    return;
                }
                var myTheme = 'dms';
                if (myChart) {
                    echarts.dispose(myChart);
                }
                myChart = null;
                myChart = echarts.init(document.getElementById('myChart'), myTheme);
                this.loading = true;
                let filterData = JSON.parse(JSON.stringify(this.myData));
                filterData.forEach(item => {
                    if ('id' in item) {
                        delete item['id'];
                    }
                });

                let chartFilterData = filterData;
                let chartGroups = this.aGroupField;
                let chartFields1 = this.aStatField;

                if (this.aSegmentInfo['group']) {
                    let groups = [
                        { title: this.aSegmentInfo['group'].title, type: 'group' }
                    ]
                    let label = this.aSegmentInfo['group'].title;
                    let hash = {};
                    let compileTitle = this.aSegmentInfo['title'] && this.aSegmentInfo['title'][0].title || '';
                    let compileRuleTitle = this.aSegmentInfo['title'] && this.aSegmentInfo['title'][0].ruleTitle || '';
                    let compileName = compileRuleTitle ? `${compileTitle}(${compileRuleTitle})` : compileTitle;

                    filterData.forEach(item => {
                        if (!hash[item[label]]) {
                            hash[item[label]] = []
                        }
                        hash[item[label]].push(item)
                    });
                    let newStats = [];
                    let newData = Object.keys(hash).map(item => {
                        let list = hash[item];
                        var arr = list.map((li, i) => {
                            let obj = {};
                            for (let k in li) {
                                if (k != compileName && k != label) {
                                    let revTitle = k;
                                    if (compileName) {
                                        revTitle = k + '-' + li[compileName];
                                    }
                                    obj[revTitle] = li[k];

                                    let o = {
                                        title: revTitle,
                                        type: 'stat'
                                    }
                                    newStats.push(o)
                                }
                            }
                            obj[label] = li[label];
                            return obj;
                        });
                        return arr;
                    });
                    newData = newData.map(data => {
                        return utils.assignSameKey('label', data);
                    });
                    newData = [].concat.apply([], newData);
                    newData = newData.map((data, index) => {
                        var ordered = {};
                        Object.keys(data).sort().forEach(function (key) {
                            ordered[key] = data[key];
                        });
                        return ordered
                    });
                    newStats = utils.assignSameKey('title', newStats);

                    let statHash = {};
                    newStats.forEach(stat => {
                        statHash[stat['title']] = stat;
                    });

                    let statArr = [];

                    Object.keys(statHash).sort().forEach(function (key) {
                        statArr.push(statHash[key]);
                    });

                    if (compileTitle) {
                        newStats = statArr;
                    }
                    chartFilterData = newData;
                    chartGroups = groups;
                    chartFields1 = newStats;
                }

                // return
                var chartData = {
                    id: myId,
                    name: myName,
                    type: this.activeType,
                    data: chartFilterData,
                    groups: chartGroups,
                    fields1: chartFields1,
                    fields2: [],
                    chart: myChart,
                    shownum: this.shownumFlag
                };

                // console.log();
                console.log('11');
                // debugger
                bi.compile.run(chartData);
                setTimeout(() => {
                    this.loading = false;
                    myChart.resize();
                }, 30);
            },

            tableInit() {
                if (this.activeType && this.activeType != 'table') {
                    return
                }
                this.setTable();
            },

            setTable() {
                if (this.ajaxLoading) {
                    return
                }
                this.activeType = 'table';
                this.createTable();
            },

            createTable() {
                var eGridDiv = document.querySelector('#myGrid');
                $('#myGrid').html('');
                agGrid.LicenseManager.setLicenseKey("Evaluation_License_Valid_Until__30_September_2018__MTUzODI2MjAwMDAwMA==b0211b0a791ee130b75eaa29a676124a");
                this.gridOptions.rowData = this.myData;

                new agGrid.Grid(eGridDiv, this.gridOptions);
                caclChartHeight();
            },

            closeModal(flag, type) {
                if (flag == 'close') {
                    if (type == 'report') {
                        this.dialogVisible = false;
                    }
                    else if (type == 'reset') {
                        this.resetModal = false;
                        this.resetBtnType = '';
                    }
                    else if (type == 'sort') {
                        this.sortModal = false;
                    }
                    else if (type == 'segement') {
                        this.segementModal = false;
                    }
                    else if (type == 'delList') {
                        this.delListModal = false;
                    }
                }
            },

            exportTable() {
                this.gridOptions.api.exportDataAsExcel();
            },

            shownum() {
                this.createChart();
            }
        }
    })
});



