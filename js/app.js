Vue.component("quiz", {
  props: ["id", "no", "name", "question", "image", "answer1", "answer2", "answer3", "answer4"],
  template: 
  `
  <div id="question" class="ui card">
    <a class="ui green corner label">
    </a>
    <img class="ui medium circular centered image" v-bind:alt="name" v-bind:src="image"></img>
    <div class="content">
        <h2 class="ui header">{{question}}</h2>
        <div class="meta">
        </div>
    </div>
    <div class="content">
        <div class="ui stackable two column grid">
            <div class="column">
                <button class="fluid ui button inverted big green" v-on:click="check(no, 1)">1.{{answer1}}</button>
            </div>
            <div class="column">
                <button class="fluid ui button inverted big green" v-on:click="check(no, 2)">2.{{answer2}}</button>
            </div>
            <div class="column">
                <button class="fluid ui button inverted big green" v-on:click="check(no, 3)">3.{{answer3}}</button>
            </div>
            <div class="column">
                <button class="fluid ui button inverted big green" v-on:click="check(no, 4)">4.{{answer4}}</button>
            </div>
        </div>
    </div>
    <div class="extra content">
        <form>
            <a class="ui circular twitter icon button" v-bind:href="'https://twitter.com/intent/tweet?text=' + question + '&url=http%3A%2F%2Flocalhost:8080%2Fquiz?no=' + no + '&hashtags=ひらがなけやき2期生クイズ%2C' + name" target="_blank">
                <i class="twitter icon"></i>
            </a>
            <button class="ui circular facebook icon button">
                <i class="facebook icon"></i>
            </button>
        </form>
    </div>
    <div v-bind:id="no + 'tick'" class="ui basic modal tick">
      <div class="ui icon header">
        <i class="green smile icon"></i>
        正解
      </div>
      <div class="content">
        <h3>{{answer.desc}}</h3>
      </div>
      <div class="actions">
        <div class="ui green ok inverted button">
            <i class="checkmark icon"></i>
            Yes
        </div>
      </div>
    </div>
    <div v-bind:id="no + 'cross'" class="ui basic modal cross">
      <div class="ui icon header">
        <i class="green frown outline icon"></i>
        不正解
      </div>
      <div class="actions">
        <div class="ui green ok inverted button">
            <i class="checkmark icon"></i>
            Yes
        </div>
      </div>
    </div>
  </div>
  `,
  data: function() {
    return {
      answer: []
    }
  },
  methods: {
    check: function(no, answer_no) {
      axios.get("http://localhost:8080/quiz/answer?no=" + no + "&answer=" + answer_no)
      .then((response) => {
        this.answer = response.data;
        if(response.data.correct) {
          $('#'+no+'tick').modal({
            centered: true
          }).modal('show');
        } else if(!response.data.correct) {
          $('#'+no+'cross').modal({
            centered: true
          }).modal('show');
        }
      })
    }
  }
});

const routes = []
const router = new VueRouter({
  mode: 'history',
  routes
});

var app = new Vue({
  el: '#app',
  data: {
    error: false,
    quizs: [],
    members: [
      { key: 'kanemuramiku', name: '金村美玖'},{ key: 'kawatahina', name: '河田陽菜'},
      { key: 'kosakanao', name: '小坂菜緒'},{ key: 'tomitasuzuka', name: '富田鈴花'},
      { key: 'nibuakari', name: '丹生明里'},{ key: 'hamagishihiyori', name: '濱岸ひより'},
      { key: 'matsudakonoka', name: '松田好花'},{ key: 'miyatamanamo', name: '宮田愛萌'},
      { key: 'watanabemiho', name: '渡邉美穂'}
    ]
  },
  methods: {
    quiz: function(member) {
      axios.get("http://localhost:8080/quiz/all")
      .then((response) => {
        this.quizs = response.data;
      })
    }
  },
  mounted() {
    console.log(this.error)
    console.log(this.$route.query.no)
    if(typeof this.$route.query.no === 'undefined' || isNaN(this.$route.query.no)) {
      axios.get("http://localhost:8080/quiz/random")
      .then((response) => {
        this.quizs = Array.of(response.data);
      })
    } else {
      axios.get("http://localhost:8080/quiz?no=" + this.$route.query.no)
      .then((response) => {
        console.log(response.data)
        this.quizs = Array.of(response.data);
      })
      .catch((response) => {
        this.error = true;
        console.log("error")
      })
    }
  }
  ,
  router
})