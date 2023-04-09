const crypto = require('crypto');

module.exports = function LiqPay(public_key, private_key) {
  this.cnb_form = function cnb_form(params) {
    let language = "ru";

    if (params.language) {
      language = params.language;
    }

    params = this.cnb_params(params);
    const data = Buffer.from(JSON.stringify(params)).toString('base64');
    const signature = this.str_to_sign(private_key + data + private_key);

    return { data, signature };
  };

  this.cnb_signature = function cnb_signature(params) {
    params = this.cnb_params(params);
    const data = Buffer.from(JSON.stringify(params)).toString('base64');
    return this.str_to_sign(private_key + data + private_key);
  };

  this.cnb_params = function cnb_params(params) {
    params.public_key = public_key;

    if (!params.version) {
      throw new Error('version is null');
    }
    if (!params.amount) {
      throw new Error('amount is null');
    }
    if (!params.currency) {
      throw new Error('currency is null');
    }
    if (!params.description) {
      throw new Error('description is null');
    }

    return params;
  };

  this.str_to_sign = function str_to_sign(str) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('base64');
  };

  this.cnb_object = function cnb_object(params) {
    let language = "ru";

    if (params.language) {
      language = params.language;
    }

    params = this.cnb_params(params);
    const data = Buffer.from(JSON.stringify(params)).toString('base64');
    const signature = this.str_to_sign(private_key + data + private_key);

    return { data: data, signature: signature };
  };

  return this;
};
