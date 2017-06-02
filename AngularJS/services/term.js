function TermSvc($http) {    
    this.getTerms = () => {
        return $http.get('/api/terms')
        .then((response) => {
            return response.data;
        },() => false);
    }
    
    this.vote = (term, score) => {
        return $http.post('/api/term/'+term._id+'/votes', {score: score})
        .then((response) => {
            return response.data;
        },() => false);
    }
}


angular.module('SuchBeer')
    .service('TermSvc', TermSvc)