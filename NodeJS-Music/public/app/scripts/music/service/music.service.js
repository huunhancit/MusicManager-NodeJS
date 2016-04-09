/**
 * Created by dhnhan on 4/8/2016.
 */
define([], function () {
    return angular.module('com.dhnhan.music.service', [])
        .factory('MusicService', ['$http', '$q', 'URL_API_MUSIC', 'URL_API_MUSIC_TYPE',
            function ($http, $q, URL_API_MUSIC, URL_API_MUSIC_TYPE) {
                return {
                    getMusic: function () {
                        var defer = $q.defer();
                        $http.get(URL_API_MUSIC)
                            .then(function successCallback(res) {
                                defer.resolve(res);
                            }, function errorCallback() {
                                console.log('Get music failed!');
                            });
                        return defer.promise;
                    },
                    getMusicType: function () {
                        var defer = $q.defer();
                        $http.get(URL_API_MUSIC_TYPE)
                            .then(function successCallback(res) {
                                defer.resolve(res);
                            }, function errorCallback() {
                                console.log('Get music type failed!');
                            })
                        return defer.promise;
                    },
                    addMusic: function (data) {
                        var defer = $q.defer();
                        $http.post(URL_API_MUSIC, data)
                            .then(function successCallback(res) {
                                defer.resolve(res);
                            }, function errorCallback() {
                                console.log('Save failed!');
                            })
                        return defer.promise;
                    },
                    getMusicByID: function (id) {
                        var defer = $q.defer();
                        $http.get(URL_API_MUSIC + '/' + id)
                            .then(function successCallback(res) {
                                defer.resolve(res);
                            }, function errorCallback() {
                                console.log('get music by id  failed!');
                            })
                        return defer.promise;
                    },
                    updateMusic: function (data) {
                        var defer = $q.defer();
                        $http.put(URL_API_MUSIC, data)
                            .then(function successCallback(res) {
                                defer.resolve(res);
                            }, function errorCallback() {
                                console.log('update music failed!');
                            })
                        return defer.promise;
                    },
                    deleteMusic: function (id) {
                        var defer = $q.defer();
                        $http.delete(URL_API_MUSIC + '/' + id)
                            .then(function successCallback(res) {
                                defer.resolve(res);
                            }, function errorCallback() {
                                console.log('delete music failed!');
                            });
                        return defer.promise;
                    },
                    deleteAll: function (ids) {
                        var defer = $q.defer();
                        $http.delete(URL_API_MUSIC + '/all/' + ids)
                            .then(function successCallback(res) {
                                defer.resolve(res);
                            }, function errorCallback() {
                                console.log('Del all failed!');
                            })
                        return defer.promise;
                    },
                    saveMusicType: function (data) {
                        var defer = $q.defer();
                        $http.post(URL_API_MUSIC_TYPE, data)
                            .then(function successCallback(res) {
                                defer.resolve(res);
                            }, function errorCallback() {
                                console.log('Add music type failed!');
                            });
                        return defer.promise;
                    },
                    filterMusic: function (typeID) {
                        var defer = $q.defer();
                        $http.get(URL_API_MUSIC + '/filter/' + typeID)
                            .then(function successCallback(res) {
                                defer.resolve(res);
                            }, function errorCallback() {
                                console.log('Filter music failed!');
                            });
                        return defer.promise;
                    }
                }
            }]);
});

