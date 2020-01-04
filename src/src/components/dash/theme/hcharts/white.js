/*
 Highcharts JS v6.0.7 (2018-02-16)

 (c) 2009-2017 Highsoft AS

 License: www.hcharts.com/license
*/
bi.dash.highthemes.white = {
  colors: bi.dash.themes.white.colors,
  chart: {
    backgroundColor: bi.dash.themes.white.backgroundColor,
    style: {"fontFamily":"宋体, 微软雅黑, Arial, Helvetica, sans-serif","fontSize":"12px"}
  },
  tooltip: {
    borderWidth: 0,
    shared: true,
    useHTML: true,
    headerFormat: '<table><tr><td colspan="2" align="center"><b>{point.key}</b></td></tr>',
    pointFormat: '<tr><td style="color: {series.color};text-align: right"><b>{series.name}:</b> </td>' +
    '<td><b>{point.y}</b></td></tr>',
    footerFormat: '</table>',
    valueDecimals: 2
  },
  colorAxis: {
    maxColor: "#05426E",
    minColor: "#F3E796"
  },
  plotOptions: {
    map: {
      nullColor: "#fcfefe"
    }
  },
  navigator: {
    maskFill: "rgba(170, 205, 170, 0.5)",
    series: {
      color: "#95C471",
      lineColor: "#35729E"
    }
  }
}