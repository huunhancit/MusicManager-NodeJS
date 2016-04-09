/**
 * Created by dhnhan on 4/8/2016.
 */
define([], function () {
    return angular.module('com.dhnhan.music.controller', [])
        .controller('MusicCtrl', ['$scope', 'MusicService', '$mdDialog', '$mdToast', '$timeout',
            function ($scope, MusicService, $mdDialog, $mdToast, $timeout) {
                $scope.musics = [];
                $scope.checkMusics = [];
                $scope.checkedMusics = [];
                $scope.all = false;
                $scope.errorMessage = false;
                $scope.music_types = [];
                $scope.music_type = {};

                $scope.loadMusic = function () {
                    MusicService.getMusic().then(function (res) {
                        $scope.musics = res.data.Data;
                        $scope.checkMusics = initCheckBox($scope.musics);
                    });
                };

                function initCheckBox(musics) {
                    var checkMusics = [];
                    for (var i = 0; i < musics.length; i++) {
                        checkMusics.push(musics[i].ID);
                    }
                    return checkMusics;
                };

                $scope.isCheckAll = function () {
                    return $scope.checkMusics.length === $scope.checkedMusics.length;
                };

                $scope.existsCheck = function (check, checkList) {
                    return checkList.indexOf(check) > -1;
                };


                $scope.checkAll = function () {
                    if ($scope.checkedMusics.length === $scope.checkMusics.length) {
                        $scope.checkedMusics = [];
                    } else if ($scope.checkedMusics.length === 0 || $scope.checkedMusics.length > 0) {
                        $scope.checkedMusics = $scope.checkMusics.slice(0);
                    }
                }

                $scope.check = function (id, listID) {
                    var index = listID.indexOf(id);
                    if (index > -1) {
                        listID.splice(index, 1);
                    } else {
                        listID.push(id);
                    }
                };

                $scope.openMusicModal = function (ev, action, id) {
                    var dialog = $mdDialog.show({
                        controller: 'MusicModelCtrl',
                        templateUrl: 'app/scripts/music/templates/MusicModal.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        locals: {
                            Action: action,
                            ID: id
                        }
                    });
                    dialog.then(function (check) {
                        if (!check.Error) {
                            $scope.loadMusic();
                            showMessage(check.Message);
                        } else {
                            showMessage(check.Message);
                        }
                    })
                };

                $scope.showMusicTypeModal = function (ev) {
                    var dialog = $mdDialog.show({
                        controller: 'MusicTypeModelCtrl',
                        templateUrl: 'app/scripts/music/templates/MusicTypeModal.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    });
                    dialog.then(function (check) {
                        showMessage(check.Message);
                    });
                };

                $scope.delMusic = function (id) {
                    MusicService.deleteMusic(id).then(function (res) {
                        if (!res.data.Error) {
                            showMessage('Delete music successful!');
                            $scope.loadMusic();
                        } else {
                            showMessage('Delete music failed!');
                        }
                    })
                };

                $scope.showConfirmDel = function (ev, id, content, type) {
                    var confirm = $mdDialog.confirm()
                        .title('Delete Music')
                        .textContent(content)
                        .ariaLabel('Delete music')
                        .targetEvent(ev)
                        .ok('Yes')
                        .cancel('No');
                    $mdDialog.show(confirm).then(function successCallback() {
                        // delete a music
                        if (type === 0) {
                            $scope.delMusic(id)
                        } else {
                            // delete all
                            if ($scope.checkedMusics.length > 0) {
                                $scope.delAll();
                            } else {
                                showMessage('Select a music!');
                            }
                        }
                    }, function errorCallback() {

                    })
                };

                $scope.loadMusicType = function () {
                    return $timeout(function () {
                        MusicService.getMusicType().then(function (res) {
                            $scope.music_types = res.data.Data;
                            $scope.music_types.unshift({ID: 0, NAME: 'All'});
                        });
                    }, 500);
                };

                function showMessage(message) {
                    var toast = $mdToast.simple()
                        .textContent(message)
                        .position('top right')
                        .hideDelay(3000);
                    $mdToast.show(toast);
                }

                $scope.delAll = function () {
                    MusicService.deleteAll($scope.checkedMusics).then(function (res) {
                        if (!res.data.Error) {
                            $scope.loadMusic();
                            showMessage('Delete all music successful!');
                        }
                        else {
                            showMessage('Delete all music failed!');
                        }
                    })
                };

                $scope.filterMusic = function () {
                    if ($scope.music_type.TYPE === 0) {
                        $scope.loadMusic();
                    } else {
                        MusicService.filterMusic($scope.music_type.TYPE).then(function (res) {
                            $scope.musics = res.data.Data;
                            $scope.checkMusics = initCheckBox($scope.musics);
                        });
                    }
                };

                function initData() {
                    $scope.loadMusic();
                };
                initData();
            }])
        .controller('MusicModelCtrl', ['$scope', '$mdDialog', 'Action', 'MusicService', 'ACTION_MUSIC', 'ID',
            function ($scope, $mdDialog, Action, MusicService, ACTION_MUSIC, ID) {
                $scope.action = Action;
                $scope.music_types = [];
                $scope.music = {};

                $scope.close = function () {
                    $mdDialog.cancel();
                };

                $scope.loadMusicType = function () {
                    MusicService.getMusicType().then(function (res) {
                        $scope.music_types = res.data.Data;
                        $scope.music.TYPE = $scope.music_types[0].ID;
                    });
                };

                $scope.save = function () {
                    if (Action === ACTION_MUSIC.NEW) {
                        MusicService.addMusic($scope.music).then(function (data) {
                            if (!data.Error) {
                                $mdDialog.hide({'Error': false, 'Message': 'Add music successful!'});
                            } else {
                                $mdDialog.hide({'Error': true, 'Message': 'Add music failed!'});
                                console.log('save failed!')
                            }
                        });
                    } else {
                        MusicService.updateMusic($scope.music).then(function (data) {
                            if (!data.Error) {
                                $mdDialog.hide({'Error': false, 'Message': 'Updated music successful!'});
                            } else {
                                $mdDialog.hide({'Error': true, 'Message': 'Update music failed!'});
                            }
                        });
                    }
                };

                function initData() {
                    $scope.loadMusicType();
                    if (Action === ACTION_MUSIC.EDIT) {
                        MusicService.getMusicByID(ID).then(function (res) {
                            $scope.music = res.data.Data;
                        });
                    }
                };
                initData();
            }])
        .controller('MusicTypeModelCtrl', ['$scope', '$mdDialog', 'MusicService', function ($scope, $mdDialog, MusicService) {
            $scope.musicType = {};

            $scope.close = function () {
                $mdDialog.cancel();
            };

            $scope.save = function () {
                MusicService.saveMusicType($scope.musicType).then(function (res) {
                    if (!res.data.Error) {
                        $mdDialog.hide({'Error': false, 'Message': 'Add music type successful!'});
                    } else {
                        $mdDialog.hide({'Error': true, 'Message': 'Add music type failed!'});
                        console.log('save failed!');
                    }
                });
            };
        }]);
})