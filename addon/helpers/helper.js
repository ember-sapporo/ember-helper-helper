import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';

export default Helper.extend({
  compute([helperName, ...headArgs]) {
    if (!helperName) { return null; }

    const helper = getOwner(this).factoryFor(`helper:${helperName}`).create();

    return (...tailArgs) => helper.compute([...headArgs, ...tailArgs]);
  }
});
