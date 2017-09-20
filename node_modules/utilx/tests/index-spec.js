'use strict';

var path = require('path')
var fs = require('fs')
var expect = require('expect.js')
var commander = require('commander')

var common = require('../index')


describe('utilx', function(){

    describe('split', function() {

        it('pass a string and return a split array', function() {
            var str = 'mac/chrome/10.0.0.1,firefox,sarafi/3.0'
            var rt = common.split(str)
            expect(rt.length).to.be(3)
            expect(rt[0]).to.be('mac/chrome/10.0.0.1')
        })

        it('pass any of other type and return an empty array', function() {
            expect(common.split().length).to.be(0)
            expect(common.split(false).length).to.be(0)
            expect(common.split([1,2,3]).length).to.be(3)
            expect(common.split({key:'value'}).length).to.be(0)
        })
    })

    it('cGetCfg', function() {
        commander
            .description('a commander')
            .option('--nick [s]', 'a name')
            .option('--favorite [s]', 'a favorite')
            .parse(['node', 'scriptpath', '--nick=fool2fish', '--favorite=imax'])
        var rt = common.cGetCfg(commander)
        expect(Object.keys(rt).length).to.be(2)
        expect(rt.nick).to.be('fool2fish')
        expect(rt.favorite).to.be('imax')
    })

    describe('readJSON', function() {

        it('pass a not exist file and return an empty plain object', function() {
            var p = path.join(__dirname, 'path', 'to', 'not-existed-file.json')
            var rt = common.readJSON(p)
            expect(Object.keys(rt).length).to.be(0)
            expect(JSON.stringify(rt)).to.be('{}')
        })

        it('pass a not proper file and return an empty plain object', function() {
            var p = path.join(__dirname, 'not-proper-file.txt')
            fs.writeFileSync(p, 'some text')

            var rt = common.readJSON(p)
            expect(Object.keys(rt).length).to.be(0)
            expect(JSON.stringify(rt)).to.be('{}')

            fs.unlinkSync(p)
        })

        it('pass a proper file and return a plain object', function() {
            var p = path.join(__dirname, 'proper-file.json')
            fs.writeFileSync(p, '{"nick": "fool2fish", "job": "web developer"}')

            var rt = common.readJSON(p)
            expect(Object.keys(rt).length).to.be(2)
            expect(rt.nick).to.be('fool2fish')
            expect(rt.job).to.be('web developer')

            fs.unlinkSync(p)
        })

    })

    describe('writeJSON', function() {

        it('create it first if the file not exist', function() {
            var p = path.join(__dirname, 'path', 'to', 'not-existed-config.json')
            common.writeJSON(p, {nick: 'fool2fish', blog: 'fool2fish.cn'})

            var cfg = require(p)
            expect(Object.keys(cfg).length).to.be(2)
            expect(cfg.nick).to.be('fool2fish')
            expect(cfg.blog).to.be('fool2fish.cn')

            fs.unlinkSync(p)
            fs.rmdirSync(path.join(__dirname, 'path', 'to'))
            fs.rmdirSync(path.join(__dirname, 'path'))
        })

        it('cover old content', function() {
            var p = path.join(__dirname, 'existed-config.json')
            fs.writeFileSync(p, '{"nick": "fool2fish", "job": "web developer"}')

            common.writeJSON(p, {nick: 'fool2fish', twitter: 'fool2fish'})

            var cfg = require(p)
            expect(Object.keys(cfg).length).to.be(2)
            expect(cfg.nick).to.be('fool2fish')
            expect(cfg.twitter).to.be('fool2fish')
            expect(cfg.blog).to.be(undefined)

            fs.unlinkSync(p)
        })

    })

    it('camelcase', function() {
        expect(common.camelcase('totoro')).to.be('totoro')
        expect(common.camelcase('totoro-server')).to.be('totoroServer')
        expect(common.camelcase('totoro-Common')).to.be('totoroCommon')
    })

    it('unCamelcase', function() {
        expect(common.unCamelcase('totoro')).to.be('totoro')
        expect(common.unCamelcase('totoroServer')).to.be('totoro-server')
        expect(common.unCamelcase('TotoroCommon')).to.be('-totoro-common')
    })

    it('isExistedFile', function() {
        var existedFile = __filename
        var notExistedFile = path.join('path', 'to', 'not-existed-file.json')

        expect(common.isExistedFile(existedFile)).to.be(true)
        expect(common.isExistedFile(existedFile + '?querystring#hash')).to.be(true)
        expect(common.isExistedFile(existedFile + '?querystring')).to.be(true)
        expect(common.isExistedFile(existedFile + '#hash')).to.be(true)
        expect(common.isExistedFile(notExistedFile)).to.be(false)
    })

    describe('mix', function() {

        describe('overwrite', function() {

            it('not overwrite', function() {
                var rt = common.mix({}, {a:'first'}, {a:'second'}, false)
                expect(rt.a).to.be('first')
            })

            it('overwrite', function() {
                var rt = common.mix({}, {a:'first'}, {a:'second'}, true)
                expect(rt.a).to.be('second')
            })
        })

        it('any of arguments could be null', function() {
            var rt1 = common.mix(null, {a: 'first'}, false)
            expect(Object.keys(rt1).length).to.be(1)
            expect(rt1.a).to.be('first')

            var rt2 = common.mix({a: 'zero'}, null, {a: 'second'}, true)
            expect(Object.keys(rt2).length).to.be(1)
            expect(rt2.a).to.be('second')

            var rt3 = common.mix({a: 'zero'}, {a: 'first'}, {a: 'second', b: 'second'})
            expect(Object.keys(rt3).length).to.be(2)
            expect(rt3.a).to.be('zero')
            expect(rt3.b).to.be('second')
        })

    })

    it('getExternalIpAddress', function() {
        var rt = common.getExternalIpAddress()
        var interfaces = require('os').networkInterfaces()
        var addresses = []
        Object.keys(interfaces).forEach(function(name) {
            addresses = addresses.concat(interfaces[name])
        })
        var addresses = addresses.filter(function(node) {
            if (node.family === 'IPv4' && node.internal === false) {
                return true
            }
        })

        if (addresses.length) {
            expect(rt).to.be(addresses[0].address)
        } else {
            expect(rt).to.be(null)
        }
    })
})
