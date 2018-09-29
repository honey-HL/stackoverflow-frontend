<template>
    <div class="search-container">
        <div class="mb24 search-box">
            <div v-if="!hasValue" id="headline">Search</div>
            <div v-else id="headline">Search Results</div>
            <div class="ask-questions">
                <div class="advanced">
                    <a href="#" class="js-advanced-tips-toggle">Advanced Search Tips</a>
                </div>
                <div class="ask-new-question" role="navigation" aria-label="ask new question">
                    <a href="/questions/ask" style="font-size: 14px;" class="s-btn">Ask Question</a>
                </div>
            </div>
        </div>
        <div v-if="hasValue == true" class="displaying-results">
            <span class="mr2">results found containing</span>
            <span class="displaying-results-highlight">{{keyWords}}</span>
        </div>
        <div class="bigsearch-inner">
            <input v-model="q" name="q" class="s-input" type="text" maxlength="140" size="80">
            <button @click="getResults()" class="search-btn">search</button>
        </div>
        <div class="results-filter">
            <div class="results-number">500 results</div>
            <div class="tabs-filter">
                <a @click="filter(true)" :class="{selected: isSelected}" class="relevance filter-btn" title="" data-value="relevance">relevance</a>
                <a @click="filter(false)" :class="{selected: !isSelected}" class="newest filter-btn" title="" data-value="newest">newest</a>
                <nav @click="showdropdown" class="more-nav filter-btn">
                    <a class="more-a">more</a>
                    <ul v-if="isDropdownShow" class="more-ul-dropdown">
                        <li>
                            <a class="disabled" href="" title="Recently active search results" data-value="active">active</a>
                        </li>
                        <li>
                            <a class="disabled" href="" title="Highest voted search results" data-value="votes">votes</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <!---rearch-results-->
        <q-results ref="refResults" :q="q"></q-results>

    </div>
</template>
<script>
import qResults from '../../components/qResults/qResults'
export default {
    name: 'search',
    components:{
        qResults
    },
    watch: {
        '$route': function (to, from) {
            console.log(to, from)
            this.getSearchValue ()
        }
    },
    data () {
        return {
            hasValue: false,
            keyWords: '',
            q: '',
            isSelected: true,
            isDropdownShow: false
        }
    },
    mounted () {
        this.getSearchValue()
    },
    methods: {
        getResults () {
            console.log(this.q)
            this.$refs.refResults.searchResults(this.q)
        },
        showdropdown () {
            this.isDropdownShow = !this.isDropdownShow;
        },
        filter (flag) {
            this.isSelected = flag;
        },
        getSearchValue () {
            console.log('welcome to search')
            if (this.$route.query.q === '') {
                this.hasValue = false;
            } else {
                this.hasValue = true;
            }
            this.keyWords = this.$route.query.q;
            this.q = this.keyWords;
        }
    }
}
</script>
<style scoped>

/*******************/

/**************************/
.relevance:hover, .newest:hover, .more-a:hover{
    color: #3b4045;
}
.more-ul-dropdown:before {
    position: absolute;
    z-index: 101;
    content: "";
    width: 0;
    height: 0;
    top: -10px;
    right: 4px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid #eaeaea;
}
.more-ul-dropdown:after {
    position: absolute;
    z-index: 101;
    content: "";
    width: 0;
    height: 0;
    top: -9px;
    right: 5px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 9px solid #fff;
}
.more-ul-dropdown li a {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 10px 10px 10px;
    display: inline-block;
    color: #07C;
    text-decoration: none;
    cursor: pointer;
}
.more-ul-dropdown li {
    text-align: left;
    white-space: nowrap;
    position: relative;
    border-bottom: 1px solid #eff0f1;
    line-height: 12px;
    display: block;
    background-color: #FFF;
    height: auto;
    margin-bottom: 0;
    transition: all .2s ease;
}
.more-ul-dropdown {
    position: absolute !important;
    top: 43px;
    z-index: 100;
    box-shadow: 0 2px 5px rgba(12,13,14,0.3);
    border-radius: 2px;
    background-color: #FFF;
    margin: 0;
}
.more-a:after {
    content: "";
    position: absolute;
    z-index: 30;
    top: calc(50% - 2px);
    right: 1em;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #6a737c;
    pointer-events: none;
}
.selected {
    color: #3b4045 !important;
    background-color: rgba(174,192,209,0.25);
    border-color: #76808a;
    z-index: 25;
    box-shadow: 0 0 0 0 rgba(145,153,161,0);
}
.more-a {
    cursor: pointer;
}
.more-nav:hover {
    background-color: rgba(174,192,209,0.25);
}
.relevance {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}
.filter-btn {
    position: relative;
    padding: 0 8px;
    box-shadow: 0 0 0 0 rgba(145,153,161,0);
    color: #6a737c;
    position: relative;
    padding: 0.7em 0.92em;
    outline: none;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.15384615;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid #adb3b9;
}
.more-nav {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    padding-right: 2em;
    cursor: pointer;
}
.newest, .more-nav {
    border-left: none;
}
.tabs-filter {
    text-transform: capitalize !important;
    display: flex;
}
.results-number {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    font-size: 1.06rem;
}
.results-filter {
    display: flex;
    margin-bottom: 16px;
    align-items: center;
}
/******************/
.displaying-results-highlight {
    font-weight: bold;
}
.mr2 {
    margin-right: 2px !important;
}
.displaying-results {
    margin: 0 0 12px 0;
    font-size: 12px;
    color: #6a737c;
    line-height: 1;
}
/**************/
.bigsearch-inner {
    display: flex;
    margin-bottom: 24px;
}
.s-input {
    width: 100%;
    margin: 0;
    padding-left: 8px;
    border: 1px solid #bbc0c4;
    border-radius: 3px;
    box-shadow: inset 0 0 1px rgba(145,153,161,0.2), 0 0 0 rgba(255,255,255,0);
    font-family: inherit;
    line-height: 1.30769231;
}
.s-input:focus-within {
    position: relative;
    border-color: #66bfff;
    box-shadow: inset 0 0 4px #eff0f1, 0 0 0 4px rgba(0,149,255,0.15);
    outline: 0;
}
/***************/
.mb24 {
    margin-bottom: 24px;
}
.s-btn:hover, .search-btn:hover{
    background: #1480d6;
}
.search-btn {
    padding: .56em .43em;
    margin-left: 8px;
}
.s-btn {
    padding: .7em .56em;
}
.s-btn, .search-btn{
    position: relative;
    border: 1px solid transparent;
    border-radius: 3px;
    background-color: transparent;
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.15384615;
    text-decoration: none;
    cursor: pointer;
    border-color: rgba(0,89,153,0);
    box-shadow: 0 0 0 0 rgba(0,149,255,0);
    color: #fff;
    background-color: #0095ff;
    border-color: #07c;
    box-shadow: inset 0 1px 0 0 rgba(102,191,255,0.75), 0 0 0 0 rgba(0,149,255,0);
}
.ask-new-question {
    padding-left: 8px;
    display: flex;
    align-items: center;
} 
.advanced a {
    color: #07C;
    text-decoration: none;
    cursor: pointer;
}
.advanced {
    display: flex;
    align-items: center;
    margin-right: 8px;
}
.ask-questions {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
#headline {
    color: #242729;
    font-size: 1.68rem !important;
    font-weight: normal;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    display: flex;
    align-items:center;
    margin: 0;
    padding: 0;
}
.search-box {
    display: flex;
}
.search-container {
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
    width: calc(100% - 300px - 24px);
}
@media (max-width: 640px) {
    .search-container {
        width: 100%;
    }
}
</style>