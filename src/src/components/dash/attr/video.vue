<template>
	<div class="dash-attr-block">
		<div class="dash-attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>属性设置</div>
		<div class="sdisplay">

            <div class="dash-attr-row" >
                <span class="dash-attr-span"  style="width:58px;">视频链接:</span>
                <input class="dash-attr-input max" type="text" v-model.lazy.trim="itemData.data.src" placeholder="视频链接地址">
            </div>

            <div class="dash-attr-row" >
                <span class="dash-attr-span"  style="width:58px;">视频类型:</span>
                <select class="dash-attr-select max" v-model="itemData.data.type">
                    <option v-for="(option,index) in videoType" :value="option.value" :key="index">{{ option.name }}</option>
                </select>
            </div>

			<div class="dash-attr-row">
				<span class="dash-attr-span"  style="width:58px;">封面图:</span>
				<input class="dash-attr-input max" type="text"  v-model.lazy.trim="itemData.data.poster"  placeholder="封面图链接地址" > 
			</div>

            <div class="dash-attr-row" style="margin:8px 0;">
                <span class="dash-attr-span" style=" width:100px; vertical-align:middle;">是否自动播放:</span>
                <el-switch
                    v-model="itemData.data.autoplay"
                    active-text="是"
                    inactive-text="否">
                </el-switch>
             </div>

              <div class="dash-attr-row">
                <span class="dash-attr-span" style=" width:100px; vertical-align:middle;">是否循环播放:</span>
                <el-switch
                    v-model="itemData.data.loop"
                    active-text="是"
                    inactive-text="否">
                </el-switch>
             </div>
    
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      videoType: [
        {
          name: "MP4",
          value: "video/mp4"
        },
        {
          name: "webm",
          value: "video/webm"
        }
      ]
    };
  },
  computed: {
    itemData() {
      return bi.dash.currItem.info;
    }
  }
};
</script>