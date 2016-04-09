/**
 * Created by dhnhan on 4/8/2016.
 */
define([
	'music/controller/music.controller',
	'music/service/music.service',
	'music/music.constant'
], function(){
	return angular.module('com.dhnhan.music', [
		'com.dhnhan.music.controller',
		'com.dhnhan.music.service',
		'com.dhnhan.music.constants',
	]);
})