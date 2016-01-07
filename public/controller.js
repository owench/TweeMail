/**
 * Created by owenchen on 16-01-02.
 */
var Twmail = angular.module('Twmail', []);


$(function() {
    $("#sign-in-with-twitter").on("click", function() {
        window.location.href = "auth/request-token";
    });
});

function mainController($scope, $http) {
    $scope.searchFormData = {};
    $scope.currentCity = {text:"Toronto"};
    $scope.testTweet = {text:"12345"};
    //
    $http.post('/api/post/search', $scope.currentCity)
        .success(function(data) {
            $scope.tweets = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    //send request to sever to search for tweet
    $scope.searchTweet = function() {
        $http.post('/api/post/search', $scope.searchFormData)
            .success(function(data) {
                $scope.searchFormData = {}; // clear the form so our user is ready to enter another
                $scope.tweets = data;
            })
            .error(function(data) {
            });
    };

    $scope.postTweet = function() {
        $http.post('/api/post/tweet', $scope.testTweet)
            .success(function(data) {

            })
            .error(function(data) {
            });
    };



}