var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');



describe('Generate Message', () => {

  it('should generate a correct new message', () => {
    var from = 'test admin';
    var text = 'test message';

    var message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(typeof message.createdAt).toBe('number');
  })

});

describe('Generate Location Message', () => {

  it('should generate a correct new location message', () => {
    var from = 'test admin';
    var lat = 12.454543345;
    var lng = 77.594543345;

    var message = generateLocationMessage(from, lat, lng);
    expect(message).toMatchObject({from, lat, lng});
    expect(typeof message.createdAt).toBe('number');
  })

});
