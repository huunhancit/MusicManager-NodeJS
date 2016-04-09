/**
 * Created by dhnhan on 4/8/2016.
 */
define([], function () {
    return angular.module('com.dhnhan.music.constants', [])
        .constant('URL_API_MUSIC', '/api/music')
        .constant('URL_API_MUSIC_TYPE', '/api/music_type')
        .constant('ACTION_MUSIC', {
            'EDIT': 'Edit',
            'NEW' : 'New'
        })
        .constant('LANGUAGE',[
            {id : 'en', name : 'English'},
            {id : 'vn', name : 'Viet Namese'}
        ]);
})
