$(function(){
  $('.selectdb').change(function(){
    var eselect = $($(this).data('tbl'));
    var tbl = eselect.data('val');
    eselect.data('db', this.value);
    
    $.get('/dai/common/gettable/id/' + this.value, function(ret){
      if (ret.status) {
        eselect.empty();
        $.each(ret.data.data, function(k,item){
          eselect.append('<option value="'+item+'"'+(item==tbl?' selected':'')+'>'+item+'</option>');
        });
        eselect.change();
      }
    });
  }).change();

  $('.selecttb').change(function(){
		var tel = $($(this).data('tel'));
		tel.data('tbl', this.value);
		tel.data('db', $(this).data('db'));
		
    if (this.value == '') {
      tel.empty();
      return false;
    }
    
    $.get('/dai/common/getField/did/' + $(this).data('db') + '/table/' + this.value, function(ret){
      if (ret.status) {
        tel.empty();
        tel.each(function(){
            var vlist = $(this).data('val') || [];
            var _this = $(this);
            if (typeof vlist == 'string') {
              vlist = [vlist];
            }
            $(_this).append('<option value="">请选择字段</option>');
            $.each(ret.data, function(k,item){
              $(_this).append('<option value="'+item+'"'+(vlist.includes(item)?' selected':'')+'>'+item+'</option>');
          });
        });
        tel.change();
      }
    });
	}).change();
});

var gridOptions = null;
function aggrid_export() { 
  gridOptions.api.exportDataAsCsv();
}

function aggrid_init(eid, rowData, head) {
  head = head || [];  
  var columnDefs = [];
  if (Array.isArray(head)) {
    for (var i = 0; i < head.length; i++) {
      columnDefs.push({
        headerName: head[i],
        field: head[i]
      });
    }
  } else {
    for (var k in head) {
      columnDefs.push({
        headerName: head[k],
        field: k
      });
    }
  }
  gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      defaultColDef: {
      width: 100,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      suppressMenu: false,
    },
    groupHideOpenParents: false,
    groupMultiAutoColumn: true,
    suppressAggFuncInHeader: true,
    enableSorting: true,
    enableFilter: false,
    enableColResize: true,
    rowGroupPanelShow: 'always',
    showToolPanel: false,
    floatingFilter: false,
    enableRangeSelection: true,
    localeText: localeText,
    suppressCopyRowsToClipboard: true,
    rememberGroupStateWhenNewData: true
  };
  
  var eGridDiv = document.querySelector(eid);
  agGrid.LicenseManager.setLicenseKey("Evaluation_License_Valid_Until__30_September_2018__MTUzODI2MjAwMDAwMA==b0211b0a791ee130b75eaa29a676124a");
  new agGrid.Grid(eGridDiv, gridOptions);
  
  if (columnDefs.length >= 12) {
    var allColumnIds = [];
    gridOptions.columnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.colId);
    });
    gridOptions.columnApi.autoSizeColumns(allColumnIds);
  }
  var allColumns = gridOptions.columnApi.getAllDisplayedColumns();
  var allWidth = 0;
  for (var i = 0; i < allColumns.length; i++) {
    allWidth += allColumns[i].actualWidth;
  }
  var gridWidth = gridOptions.api.gridPanel.getBodyClientRect().width;
  //console.log(allWidth, gridWidth);
  if (allWidth < gridWidth * 1.2) {
    gridOptions.api.sizeColumnsToFit();
  }
}