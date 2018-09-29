<template>
    <div class="qResults">
        <div v-for="(item, index) in results" :key="index" class="question-summary">

            <div class="statscontainer">
                <div class="stats">
                    <div class="votes ">
                        <strong class="votes-count">0</strong>
                        <div class="viewcount">votes</div>
                    </div>
                    <div class="status answered">
                        <strong class="votes-count">1</strong>answer
                    </div>
                </div>
            </div>
             <!--summary-->
            <div class="summary">
                <h3>
                    <a class="description" href="javascript;void(0)">
                        Q: {{item.title}}
                    </a>
                </h3>
                <div v-html="item.body" class="excerpt"></div>
                <div class="tags">
                    <a 
                    v-for="(tag, tagIndex) in item.tags" 
                    href="javascript:void(0)"
                    :key="tagIndex"
                    >{{tag}}</a>
                </div>
                <div class="started">
                    <a class="started-link" href="javascript:void(0)">
                        <span v-if="item.answer_count > 0">
                            <span v-if="item.last_activity_date > item.last_edit_date">
                                answered
                            </span>
                            <span v-else>
                                modified
                            </span>
                        </span>
                        <span v-else>asked</span> 
                        <span class="relativetime">
                            <span v-if="item.creation_date && (!item.last_activity_date && !item.last_edit_date)">
                                {{calculateGap(item.creation_date)}}
                            </span>
                            <span v-if="item.creation_date && (item.last_activity_date && !item.last_edit_date)">
                                {{calculateGap(item.last_activity_date)}}
                            </span>
                            <span v-if="item.creation_date && (!item.last_activity_date && item.last_edit_date)">
                                {{calculateGap(item.last_edit_date)}}
                            </span>
                            <span v-if="item.creation_date && (item.last_activity_date && item.last_edit_date)">
                                {{calculateGap(item.last_activity_date)}}
                            </span>
                            ago
                        </span>
                    </a>
                    <a class="uname" href="javascript:void(0)">{{item.owner.display_name}}</a>
                    <span class="reputation-score" title="reputation score">{{item.owner.reputation}}</span>
                </div>
            </div>
            <!---summary-->
        </div>
    </div>
</template>
<script>

export default {
    name: 'qResults',
    components:{
    },
    data () {
        return {
            prefix: 'http://api.stackexchange.com/2.2/',
            results: [],
            key: this.q,
            item: {
                answer_count: 2,
                creation_date: 1538123808,
                is_answered: false,
                last_activity_date: 1538125873,
                last_edit_date: 1538125653,
                link: "https://stackoverflow.com/questions/52551432/how-to-make-scrollable-div-inside-a-td",
                owner: {
                    accept_rate: 59,
                    display_name: "ashura91",
                    reputation: 245,
                    user_id: 5322741,
                    user_type: "registered"
                },
                question_id: 52551432,
                score: 0,
                tags: ["html", "css", "html-table"],
                title: "How to make scrollable div inside a &lt;td&gt;?",
                desc: '<p>i simply want to print a .pdf file that i imported via reportlab.</p>',
                view_count: 39
            }
        }
    },
    props: {
        q: String
    },
    watch: {
        '$route': function (to, from) {
            console.log('welcome qresults')
            this.searchResults()
        }
    },
    methods: {
        searchResults (key) {
            console.log(key)
            let that = this
            axios.get(this.prefix + 'search/advanced',{
                params: {
                    page: 1,
                    pagesize: 10,
                    q: key,
                    filter: '!9Z(-wwYGT',
                    order: 'desc',
                    sort: 'relevance',
                    site: 'stackoverflow'
                }
            })
            .then(function (res) {
               that.results = res.data.items;
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        calculateGap (time) {
            let old = (time + '').length > 10 ? time : time * 1000;
            let gap = new Date().getTime() - old;
            let days = parseInt(gap / parseInt(1000 * 60 * 60 * 24));
            let hours = parseInt(gap / parseInt(1000 * 60 * 60));
            let mins = parseInt(gap / parseInt(1000 * 60));
            let secs = parseInt(gap / parseInt(1000));
            if (days > 0) {
                return days + ' days'
            } else {
                if (hours > 0) {
                    return hours + ' hours'
                } else {
                   if (mins > 0) {
                       return mins + ' mins'
                   } else {
                       if (secs > 0) {
                           return secs + ' secs'
                       }
                   }
                }
            }
        }
    }
}
</script>
<style scoped> 
/*************summary***************/
.excerpt {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    padding: 0;
    padding-bottom: 5px;
    margin: 0;
    color: #3b4045;
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
}
.reputation-score {
    font-weight: bold;
    color: #848d95;
    font-size: 12px;
    margin-right: 2px;
}
.started .uname:hover{
     color: #3cacfc;
}
.started a:not(.started-link) {
    font-size: 12px;
    color: #07C;
}
.started-link:hover {
    color: #1279c9;
}
.started-link {
    font-size: 12px;
    color: #9199a1;
}
.started a {
    cursor: pointer;
}
.started {
    width: auto;
    line-height: inherit;
    padding-top: 4px;
    white-space: nowrap;
    float: right;
}
/******************/
.tags a {
    font-size: 12px;
    color: #39739d;
    background-color: #E1ECF4;
    border: 1px solid #E1ECF4;
    position: relative;
    display: inline-block;
    padding: .4em .5em;
    margin: 2px 6px 2px 0;
    line-height: 1;
    white-space: nowrap;
    text-decoration: none;
    text-align: center;
    border-radius: 3px;
    transition: all .15s ease-in-out;
}
.tags {
    line-height: 18px;
    float: left; 
}
/****************/
.summary h3 {
    margin-bottom: .35em;
}
.summary h3 a:hover {
    color: #3cacfc;
}
.description {
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
    color: #07C;
    line-height: 1.3;
    margin-bottom: 1.2em;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
}
/*************/
.question-summary .interaction .answered{
    color: #45A163;
    border: 1px solid rgba(69,161,99,0.5);
    border-radius: 3px;
}
.question-summary .interaction .answered .mini-counts {
    color: #45A163;
}
.mini-counts {  
    font-size: 17px;
    font-weight: 300;
    color: #6a737c;
    margin-bottom: 4px;
}
.interaction .votes, .interaction .answers, .interaction .view{
    display: inline-block;
    /* height: 38px; */
    min-width: 38px;
    margin: 0 3px 0 0;
    font-size: 11px;
    color: #848d95;
    padding: 7px 6px;
    text-align: center;
}
.interaction {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    margin-right: 0;
    padding: 0 8px 0 0;
    box-sizing: content-box;
    flex-shrink: 0;
}
.summary {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    width: auto;
    float: none;
    margin: 0;
    overflow: hidden;
}
/************statscontainer*************/
.status strong {
    display: block;
}
.status.answered {
    border-color: rgba(69,161,99,0.5);
    color: #45A163;
    padding: 7px 0 5px;
    border-radius: 3px;
    border: 1px solid #45A163;
    font-size: 11px;
    text-align: center;
}
.votes-count {
    font-size: 20px;
    margin: 0 0 3px;
    font-weight:normal;
}
.votes {
    text-align: center;
    color: #6a737c;
    font-size: 11px;
    padding: 0;
    margin-bottom: 8px;
}
.stats {
    margin: 0;
    width: 58px;
}
.statscontainer {
    margin-right: 16px;
    width: 58px;
    float: none;
    margin-left: 8px;
    flex-shrink: 0;
}
.question-summary {
    display: flex;
    border-bottom: 1px solid #eff0f1;
    padding: 12px 8px;
}
.qResults {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #d6d9dc;
    margin-left: -24px;
}
</style>