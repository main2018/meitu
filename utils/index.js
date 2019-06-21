export function compare(prop, plusSort = true) {
  // 排序
  return (obj1, obj2) => {
    let obejct1 = obj1[prop]
    let obejct2 = obj2[prop]
    if (plusSort) return obejct1 < obejct2 ? -1 : obejct1 > obejct2 ? 1 : 0
    return obejct1 < obejct2 ? 1 : obejct1 > obejct2 ? -1 : 0
  }
}

export function dateDay(time, gap = "-", suffix = false, isPrecise = false) {
  let date = new Date(time)
  let Y, M, D, h, m, s
  Y = date.getFullYear()
  M = date.getMonth() + 1
  D = date.getDate()
  h = date.getHours()
  m = date.getMinutes()
  s = 'date.getSeconds()'
  // let precise = suffix ? ` ${leftZero(h)}时${leftZero(m)}分${leftZero(s)}秒` : ` ${leftZero(h)}:${leftZero(m)}:${leftZero(s)}`
  let precise = suffix ? ` ${leftZero(h)}时${leftZero(m)}分${leftZero(s)}秒` : ` ${leftZero(h)}:${leftZero(m)}`
  if (suffix) return Y + "年" + leftZero(M) + "月" + leftZero(D) + "日" + (isPrecise ? precise : '')
  return Y + gap + leftZero(M) + gap + leftZero(D) + (isPrecise ? precise : '')
}

export function leftZero(str) {
  // 左边+0的方法
  return ("00" + String(str)).substr(String(str).length)
}

export const Searcher = (() => {
  let escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
  let escapeReg = reg => reg.replace(escapeRegExp, '\\$&');
  //groupLeft 与 groupRight是对结果进一步处理所使用的分割符，可以修改
  // let groupLeft = '(',
  //     groupRight = ')';
  // let groupLeft = '<span style="color: red">',
  //     groupRight = '</span>';
  let groupLeft = '',
      groupRight = '';
  let groupReg = new RegExp(escapeReg(groupRight + groupLeft), 'g');
  let groupExtractReg = new RegExp('(' + escapeReg(groupLeft) + '[\\s\\S]+?' + escapeReg(groupRight) + ')', 'g');
  //从str中找到最大的匹配长度
  let findMax = (str, keyword) => {
    let max = 0;
    keyword = groupLeft + keyword + groupRight;
    str.replace(groupExtractReg, m => {
      //keyword完整的出现在str中，则优秀级最高，排前面
      if (keyword == m) {
          max = Number.MAX_SAFE_INTEGER;
      } else if (m.length > max) {//找最大长度
          max = m.length;
      }
    });
    return max;
  };
  let keyReg = key => {
    let src = ['(.*?)('];
    let ks = key.split('');
    if (ks.length) {
      while (ks.length) {
        src.push(escapeReg(ks.shift()), ')(.*?)(');
      }
      src.pop();
    }
    src.push(')(.*?)');
    src = src.join('');
    let reg = new RegExp(src, 'i');
    let replacer = [];
    let start = key.length;
    let begin = 1;
    while (start > 0) {
      start--;
      replacer.push('$', begin, groupLeft + '$', begin + 1, groupRight);
      begin += 2;
    }
    replacer.push('$', begin);
    const info = {
      regexp: reg,
      replacement: replacer.join('')
    };
    return info;
  };
  return {
    search(list, keyword) {
      //生成搜索正则
      let kr = keyReg(keyword);
      let result = [];
      for (let e of list) {
        //如果匹配
        if (kr.regexp.test(e)) {
          //把结果放入result数组中
          result.push(e.replace(kr.regexp, kr.replacement)
              .replace(groupReg, ''));
        }
      }
      //对搜索结果进行排序
      //1\. 匹配关键字大小写一致的优先级最高，比如搜索up, 结果中的[user-page,beginUpdate,update,endUpdate]，update要排在最前面，因为大小写匹配
      //2\. 匹配关键字长的排在前面
      result = result.sort((a, b) => findMax(b, keyword) - findMax(a, keyword));
      return result;
    }
  };
})();