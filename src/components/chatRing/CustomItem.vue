<script>
import PersonBox from '@/components/chatRing/PersonBox.vue'
import MapSwiper from '@/components/chatRing/MapSwiper.vue'
import { computed, onUpdated, ref } from 'vue';
import { useStore } from 'vuex';
export default {
    components:{
        PersonBox,
        MapSwiper,
    },
    setup () {
      const store = useStore();

      const game_id = computed(()=>store.getters.game_id)
      const RingSelected = computed(()=>store.getters.RingSelected)
      const RoleSelected = computed(()=>store.getters.RoleSelected)
      const handGameID = (el) =>{
        store.dispatch('handGameID',el.target.value)
      }
      // ID字數限制
      const gameIDcount = ref(0)
      const gameIDAlert = ref(false)
      function checkInput(el) {
        
        let punctuationCount = (el.target.value.match(/[\p{P}\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F]/gu)|| []).length;
        let symbolCount = (el.target.value.match(/[\p{S}\u2070-\u209F\u20A0-\u20CF\u2100-\u214F]/gu)|| []).length;
        let whitespaceCount = (el.target.value.match(/[\p{Z}\u0009-\u000D\u0020]/gu)|| []).length;
        let chinesesymbolCount = (el.target.value.match(/[\u3105-\u3129\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9]/g
        ) || []).length; 
        if(chinesesymbolCount !== 0 || whitespaceCount !== 0 || symbolCount !== 0 || punctuationCount !== 0 ){
            gameIDAlert.value = true
        }else{
            gameIDAlert.value = false
        }
        let chineseCount = (el.target.value.match(/[\u4e00-\u9fa5]/g) || []).length;
        let englishCount = (el.target.value.match(/[a-zA-Z]/g) || []).length; 
        let numberCount = (el.target.value.match(/[0-9]/g) || []).length; 

        gameIDcount.value =  numberCount + chineseCount * 2 + englishCount;
        // 字符數4~12才正常
        if(gameIDcount.value <= 3 || gameIDcount.value >= 13){
            gameIDAlert.value = true
        }
  
      }   
      const handRingNavBool = (el)=>{
        let txt = el.currentTarget.dataset.ring
        console.log(txt);
        store.dispatch('handRingNavBool',txt)
      }
      const handpersonBoxBool = (el) =>{
        let txt = el.currentTarget.dataset.txt
        store.dispatch('handpersonBoxBool',txt)
      }      
      

        

        return {
          game_id,
          handGameID,
          checkInput,
          gameIDAlert,
          RingSelected,
          RoleSelected,
          handRingNavBool,
          handpersonBoxBool,
        }
    }
}
</script>

<template>
<div class="CustomContainer">
    <div class="question q1">
        <h1>1.選擇聊天戒指</h1>                
        <li class="itemSelected" data-ring="selected"
        @click="handRingNavBool"
        >
            <img 
            :src="RingSelected.url" 
            alt="" >
            <span :class="{'noneImg' : RingSelected.key === '無'}">{{RingSelected.key}}</span>
        </li>
    </div>    
    <div class="question q3">
        <h1>2.輸入ID</h1>
        <input 
        @input.prevent="handGameID"
        @keyup.prevent="checkInput"
        v-model="game_id"
        placeholder="輸入角色名稱"
        >
        <div class="alertbox">
            <p class="IDalert" v-show="gameIDAlert">ID不符合遊戲規則!</p>
        </div>
    </div>    
    <div class="question q2">
              <h1>3.選擇喜歡的角色圖</h1>
              <div 
              @click="handpersonBoxBool"
              class="personSelected">
                <img 
                :src="RoleSelected.url"
                alt="">
              </div>
    </div>       
    <PersonBox />
    <div class="RWDremind">
      
        <span>建議用電腦全螢幕測試!</span>
    </div>
    <MapSwiper />    
</div>
</template>



<style lang="scss" scoped>
.CustomContainer{
  position: absolute;
  width: 800px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #AAA;
  display: flex;
  justify-content: space-around;
  .question{
    position: relative;
    z-index: 2;
    top: 0;
    left: 0;

    h1{
      font-size: 20px;
      margin-top: 3px;
      margin-bottom: 10px;
    }
  }
  .q1{
    .itemSelected{
      // border: 1px solid;
      background-color: #EEE;
      border-radius: 3px;
      cursor: pointer;
      width: 200px;
      line-height: 45px;
      user-select: none;
      position: relative;
      height: 60px;
      &:after{
        display: none;
        content: url(~@/assets/RingProject/symbal/arrow.png);
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-55%) rotate(90deg) scale(0.8);
      }
      img{
        margin-top: 10px;
        margin-left: 10px;
      }
      span{
        // position: relative;
        // top: -5px;
        // padding-left: 20px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 20px;
        &.noneImg{
          padding-left: 35px;
        }
      }
  }


  }
  .q2{
    .personSelected{
      background-color: #EEE;
      border-radius: 4px;
      box-shadow: 0 0 7px #888;
      width: 90px;
      height: 90px;
      position: relative;
      left: 50px;
      margin-bottom: 10px;
      
      img{
        width: 70px;
        height: 90px;
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -2px;

      }
    }
  }
  .q3{
    input{
      padding: 7px;
    }
    .alertbox{
     //  border: 1px solid; 
      height: 20px;
      .IDalert{
       color: #F00;
       font-size: 14px;
      }
   }
  }
  .RWDremind{
    display: none;
  }
  
}
@media (max-width: 992px) { 
  .CustomContainer{
    width: 100%;
    flex-wrap: wrap;
    padding-bottom: 300px;
    .question{
      width: 100%;
      h1{
        font-size: 15px;
        padding-left: 5px;
        margin-top: 3px;
        margin-bottom: 10px;
      }
    }
    .q1{
      .itemSelected{
        // border: 1px solid;
        background-color: #EEE;
        border-radius: 3px;
        margin-left: 30px;
        cursor: pointer;
        width: 150px;
        line-height: 45px;
        user-select: none;
        position: relative;
        img{
          margin-top: 10px;
          margin-left: 10px;
        }
        span{
          position: relative;
          top: -5px;
          padding-left: 20px;
          &.noneImg{
            top: 0;
          }
        }
    }
  
  
    }
    .q2{
      .personSelected{
        background-color: #EEE;
        border-radius: 4px;
        box-shadow: 0 0 7px #888;
        width: 90px;
        height: 90px;
        position: relative;
        left: 30px;
        margin-bottom: 10px;
        
        img{
          width: 70px;
          height: 90px;
          display: block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -2px;
  
        }
      }
    }
    .q3{
      input{
        padding: 7px;
        width: 200px;
        margin-left: 30px;
      }
      .alertbox{
       //  border: 1px solid; 
        height: 20px;
        .IDalert{
         font-size: 14px;
         margin-left: 30px;
         margin-top: 10px;
        }
     }
    }
    .RWDremind{
        display: block;
        color: #F00;
    }    
    
  }

}


</style>