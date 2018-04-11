var expect = require('expect');
var {generateMessage} = require('./message.js');



describe('Generate Message', () => {
  it('should generate a correct new message', () => {
    var from = 'test admin';
    var text = 'test message'

    var message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(typeof message.createdAt).toBe('number');
  })

});
