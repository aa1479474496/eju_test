const mockData = {
  field: "time",
  type: "date",
  title: "选择时间",
  value: [
    {
      component: "MonthComplete",
      name: "最新完整月"
    },
    {
      component: "WeekComplete",
      name: "最新完整周"
    },
    {
      component: "Day",
      name: "日度"
    },
    {
      component: "Week",
      name: "周度"
    },
    {
      component: "Month",
      name: "月度"
    },
    {
      component: "Quarter",
      name: "季度"
    },
    {
      component: "Year",
      name: "年度"
    }
  ],
  dataRange: ["2006-01-02", "2020-03-05"]
};

export default mockData;
