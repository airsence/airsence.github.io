

// Vue.component('period-button',{
var PeriodButton ={
    props:['button'],
    template:`
    <li>
        <button type="button" class="period_button" :id="button.buttonID" onclick="onPeriodClicked(this.id)">
        {{button.name}}
        </button>
    </li>
    `
};
// });


// Vue.component('information-section',{
var InformationSection =    {
    props:['info'],
    template:`
    <section class="information-section col-12" :id="info.name + '-info'">
    <p v-html="info.brief"></p> <button onclick="onClickHere(this.id)" :id="info.name + '-info-'">
    <a :href="'#' + info.name + '-info-detail' ">Click Here</a>
    </button> to learn more!
    </section>
    `
    };
// });

// Vue.component('detail-information',{
var DetailInformation = {
    props:['info'],
    template:`
    <section class="detail-info" :id="info.name + '-info-detail'">
        <div class="close-bar">
            <button onclick="closeAllInfoBlock()" :id="info.name + '-info-detail-close'">
                <i class="far fa-times-circle"></i>
            </button>
        </div>
        <p :id="info.name + '_p'" v-html="info.detail"></p>
        <a :href="info.link" target="_blank">{{info.link}}</a>
    </section>
    `
};
// });

// Vue.component('pollutant-button',{
var PollutantButton ={
    props:['button'],
    template:`
    <li>
        <button :id='button.unit' class='parammenu-button grey' @click="$emit('button-clicked',button.unit)">
            {{button.name}}<sub>{{button.sub}}</sub>
            <a :id='button.unit + "-unit"'>--</a>
        </button>
    </li>
    `
};
// });

// Vue.component('MyCircle',{
var MyCircle =   {
    props:['data'],
    template:`
    <button :id="data.id" @click="$emit('circle-clicked',data.id)">
    <div class="circle grey" id="circle">

      <span class="paramname" id="paramname">{{data.pollutant}}</span>
      <br/>
      <span class="paramunit" id="unit">--</span>

    </div>
   </button>
    `
};
// });

Vue.component('CallBackButton',{
    props:['button'],
    computed: {
        clickListeners: function () {
          var vm = this
          return Object.assign({},
            this.$listeners,

            {
              click: function (event) {
                vm.$emit('click', event.target.value)
              }
            }
          )
        }
      },
    template:`
    <button v-if="button.link != ''" v-on="clickListeners" :id="button.id">
      <a :href="button.link">{{button.name}}</a>
    </button>
    <button v-else v-on="clickListeners" :id="button.id">
    <a>{{button.name}}</a>
    </button>
    `
    
});
Vue.component('LinkButton',{
    props:['button'],
    template:`
        <a :href="button.link" target="_blank" :id="button.id">
        {{button.name}}
        </a>
    `
});
Vue.component('ImageButton',{
    props:['button'],
    template:`
    <a :href="button.link" class="icon" target="_blank" :id="button.id">
        <img :src="button.image">
    </a>
    `
})
Vue.component( 'MyNavBar' , {
  props: ['navbar'],
  template: `
        <ul>
            <li>
              <button onclick="onClickHere(this.id)" id="about-info-">
                <a href="#about-info-detail">{{navbar.FirstButton}}</a>
              </button>
            </li>
            <li>
              <button onclick="restartGuide()">
                  <a>{{navbar.SecondButton}}</a>
              </button>
            </li>
            <li>
                <a :href="navbar.Resources.link">
                    {{navbar.Resources.name}}
                  </a>
            </li>
            <li>
                <a :href="navbar.Twitter.link" class="icon" target="_blank">
                    <img :src="navbar.Twitter.image">
                </a>
                <a href="navbar.ContactUs.link" class="icon" target="_blank">
                    <img :src="navbar.ContactUs.image">
                </a>
            </li>
            <li>
                <a :href="navbar.LastButton.link" target="_blank">
                    {{navbar.LastButton.name}}
                </a>
            </li>
        </ul>
    `
});

var IconButton = {
    props:['button'],
    template:`
    <button  :style="{display: button.display}" @click="$emit('button-clicked')">
    <i :class="button.class" ></i>
    <span :id="button.id" :style="{display: button.display}">--</span>&nbsp;
    </button>
    `
};

var LanguageButton = {
    props:['language'],
    template:`
            <button :id="language" @click="$emit('click',language)">
                {{language}}            
            </button>
    `
};

var NewBlock = {
  props: ["article"],
  template: `
<section class="new-block" :id="article.id">
    <h1>{{article.title}}</h1>
    <section class="summary">
    {{article.summary}}
    <a :href="article.link" target="_blank">READ MORE</a>
    </section>
</section>
`
};

var VideoBlock = {
  props: ["video"],
  template: `
<div class="video-block">
    <h1>{{video.title}}</h1>
    <iframe :src="video.link" frameborder="0" allowfullscreen>
    </iframe>
</div>
`
};

