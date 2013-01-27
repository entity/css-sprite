
/**
 * css-sprite
 */

module.exports = function (url, map) {
  var sprite = {}

  sprite.sprite = {
    url: [String, url]
  , map: [Object, map || {}]
  , face: [String, 'stand']
  , frame: [Number, 0]
  , duration: [Number, 1]
  , standing: [Boolean, false]
  }

  sprite.init = function (e) {
    e.el.style.backgroundImage = 'url('+e.sprite.url+')'
  }

  sprite.update = function (e) {
    if (e.sprite.standing) return
    if (!(e.sprite.face in e.sprite.map)) return

    var current = e.sprite.map[e.sprite.face][e.sprite.frame]

    if (e.sprite.duration <= 1) {
      e.sprite.frame++
      if (e.sprite.frame >= e.sprite.map[e.sprite.face].length) {
        e.sprite.frame = 0
      }
      e.sprite.duration = current[1]
    }
    else {
      e.sprite.duration--
    }
  }

  sprite.render = function (e, a, force) {
    if (!force && e.sprite.standing) return
    if (!(e.sprite.face in e.sprite.map)) return

    var current = e.sprite.map[e.sprite.face][e.sprite.frame]

    e.setSpriteBgPos(
      [ current[3]
      , 'px '
      , - (current[0] * e.mesh.size.height
        + current[2])
      , 'px'
      ].join('')
    )
  }

  // methods
  sprite.setSpriteBgPos = function (newpos) {
    this.el.style.backgroundPosition = newpos
  }

  sprite.setSpriteFace = function (face) {
    this.sprite.standing = false
    if (!(face in this.sprite.map)) {
      this.sprite.standing = true
      this.sprite.duration = 1
      this.sprite.frame = 0
      sprite.render(this, 1, true)
      return
    }
    this.sprite.face = face
  }

  sprite.setRandomSpriteFace = function () {
    var keys = Object.keys(this.sprite.map)
    var k = keys[Math.floor(Math.random() * keys.length)]
    this.setSpriteFace(k)
  }

  return sprite
}
