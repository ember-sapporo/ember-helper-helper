import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';
import { isNone } from '@ember/utils';

export default Helper.extend({
  compute([helperName, ...headArgs], hash) {
    if (isNone(helperName)) { return () => {}; }

    const helper = getOwner(this).factoryFor(`helper:${helperName}`).create();

    return (...tailArgs) => helper.compute([...headArgs, ...tailArgs], hash);
  }
});
