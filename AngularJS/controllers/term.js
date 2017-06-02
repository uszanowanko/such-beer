function TermCtrl(TermSvc) {
    var _defer = [];
    
    TermSvc.getTerms().then((terms) => {
        this.terms = terms
    });
    
    this.vote = (term, score) => {
        if (_defer[term._id]) {
            clearTimeout(_defer[term._id]);
        }
        _defer[term._id] = setTimeout(() => TermSvc.vote(term, score), 500);
    }
    
}

angular.module('SuchBeer').controller('TermCtrl', TermCtrl);