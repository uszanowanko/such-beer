function TermCtrl($scope, TermSvc) {
    var _defer = [];
    
    TermSvc.getTerms().then((terms) => {
        this.terms = terms
    });
    
    this.vote = (term, index, score) => {
        if (_defer[term._id]) {
            clearTimeout(_defer[term._id]);
        }
        _defer[term._id] = setTimeout(() => {
            TermSvc.vote(term, score).then((response)=>{
                this.terms[index].score = response.score;
            })
        }, 100);
    }
    
    this.addTerm = (term) => {
        TermSvc.addTerm(term).then((response) => {
            this.terms.push(response)
            term.name = null;
            term.date = null;
        })
    }
    
}

angular.module('SuchBeer').controller('TermCtrl', TermCtrl);