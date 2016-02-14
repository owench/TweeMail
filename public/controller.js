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
    $scope.tweetFormData = {};
    $scope.currentCity = {text:"Toronto"};
    $scope.testTweet = {text:"12345"};
    $scope.image = {url:"https://abs.twimg.com/sticky/default_profile_images/default_profile_5_normal.png"};
    //

    $http.get('/is-user-auth')
        .success(function(data) {
            if(data == 'false')
            {
                $('#profile-pic').toggle(false);
                $('#sign-in-with-twitter').toggle(true);

                $http.post('/api/post/search', $scope.currentCity)
                    .success(function(data) {
                        $scope.tweets = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            }
            else
            {
                $('#sign-in-with-twitter').toggle(false);
                $('#profile-pic').toggle(true);

                $http.get('/user-profile-pic')
                    .success(function(data) {
                        $scope.image = {url:data};
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

                $http.get('/user-home')
                    .success(function(data) {
                        $scope.tweets = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

                $http.get('/get-trends')
                    .success(function(data) {
                        $scope.trends = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            }
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
        $http.post('/api/post/tweet', $scope.tweetFormData)
            .success(function(data) {
                $scope.tweetFormData = {};
            })
            .error(function(data) {
                $scope.tweetFormData = {};
            });
    };

    $scope.composeTweet = function() {

        $http.get('/is-user-auth')
            .success(function(data) {
                if(data == 'false') {
                    window.location.href = "auth/request-token";
                }
                else
                {
                    $("#blank-email").fadeIn();
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}