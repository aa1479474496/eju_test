import { computed, onMounted } from "vue";
import { useStore } from "vuex";

import Api from "/@/api/home";
import { ADataItem } from '/@/api/model/homeModel';

type HashType = {
    [key: string | number] : string | {};
}

export function useGroupList(joinWord = '囖') {
    const store = useStore();
    const group: typeof store.state.home.group = computed(() => store.state.home.group);
    onMounted(async () => {
        getGroupList()
    });

    async function getGroupList() {
        //获取所有的企业分组
        let { aData = [] } = group;
        if (aData.length) {
            return;
        }
        let res = await Api.getGroupList();
        if (res.ErrorCode === 200) {
            let { aData = [] } = res.Data;
            let hashState =  formatDataToHah(aData);
            store.dispatch("home/setGroup", {
                aData,
                ...hashState
            })

        }
    }

    function formatDataToHah(aData: ADataItem[]) {
        // 拿到企业分组数据存到store中， hash数据也需要缓存
      let hashWithId:HashType = {};
      let hashWithLetter:HashType = {};
      let allSnamesArr:string[] = [];
      let allSnames = '';
      aData.forEach((item) => {
        let { sGroup, aList = [] } = item;
        let names = aList.map((li) => li.sName).join(joinWord);

        hashWithLetter[sGroup] = names;
        allSnamesArr.push(names);
        aList.forEach((aItem) => {
          hashWithId[aItem.iAutoID] = {
            sGroup,
            ...aItem,
          };
        });
      });

      allSnames = allSnamesArr.join(joinWord);
      return {
        allSnames,
        hashWithLetter,
        hashWithId
      }
     }

}