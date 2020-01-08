let vm = new Vue({
    el: "#main-container",
    data:{
        words: [],
        knownWords: [],
        translations: {}
    },
    computed: {
    },
    methods:{
        inputChanged: function(event){
            this.words = [];
            let splits = event.target.value.split(' ');
            for (word of splits){
                word = word.replace(/\W/g, '');
                if(/\S/.test(word)){
                    this.words.push(word);
                }
            }
        },
        isWordKnown: function(word){
            return this.knownWords.indexOf(word) !== -1;
        },
        isWordUnKnown: function(word){
            return this.knownWords.indexOf(word) === -1;
        },
        isWordTranslated: function(word){
            return this.translations[word] !== undefined;
        },
        setTranslation: function(word, event){
            this.translations[word] = event.target.value;
            this.$forceUpdate(); // this is not the way :/
        },
        getTranslation: function(word){
            return this.translations[word];
        },
        swapWord: function(word){
            if(this.isWordKnown(word)){
                this.knownWords.splice(this.knownWords.indexOf(word), 1);
            }
            else{
                this.knownWords.push(word);
            }
        },
        flipCard: function(event){
            event.preventDefault();
            event.stopPropagation();
            if(event.target.getAttribute("data-flip") == "esp"){
                event.target.setAttribute("data-flip", "eng");
            }
            else{
                event.target.setAttribute("data-flip", "esp");
            }
        },
        toggleEdit: function(event){
            event.preventDefault();
            event.stopPropagation();
            if(event.target.getAttribute("data-edit") == "edit"){
                event.target.setAttribute("data-edit", "hide");
            }
            else{
                event.target.setAttribute("data-edit", "edit");
            }
        },
        lookUpWord:function(word, event){
            event.preventDefault();
            event.stopPropagation();
            window.open("https://spanishdict.com/translate/" + word, "_blank");
        }
    }
});