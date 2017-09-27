import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import hyperform from 'hyperform';

Enzyme.configure({ adapter: new Adapter() });
hyperform(global.window);
