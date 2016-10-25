import chai from 'chai';
import chaiColors from 'chai-colors';
import chaiEnzyme from 'chai-enzyme';
import chaiSinon from 'sinon-chai';
import dirtyChai from 'dirty-chai';

global.expect = chai.expect;
chai.should();
chai.use(chaiColors);
chai.use(dirtyChai);
chai.use(chaiSinon);
chai.use(chaiEnzyme());
