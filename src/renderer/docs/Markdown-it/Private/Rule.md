# Rule

```typescript

interface RuleItem {
  name: string,
  enabled: boolean,
  fn: function,
  alt: string[]
}

interface Rule {
  // Find rule index by name
  // 从规则中查找对应name的序号 没有则为-1
  __find__ (name: string) : number
  // Build rules lookup cache
  // 遍历rule将rule中的alt存放到新的chain数组中
  // 重置cache为空对象
  // 遍历chain, 将每个alt以键值为空数组存放到cache中
  // 遍历rule, 将规则中包含了alt的fn函数存入对应cache[alt]的数组
  // 把针对name关联的fn 转变为针对单个alt => fn 集合
  __compile__ () : void

  // Replace rule by name with new function & options.
  // 从rule中调用find找寻名为name的规则
  // 使用传入的fn替换rule.fn, 使用opt.alt替换alt
  // 重置cache
  at (name: string, fn: function, options = {}): void

  // Add new rule to chain before one with given name
  // 在指定的规则前插入新的规则
  // 重置cache
  before (beforeName, ruleName, fn, options): void

  // Add new rule to chain after one with given name
  // 在指定的规则后插入新的规则
  // 重置cache
  after (afterName, ruleName, fn, options):void

  // Push new rule to the end of chain.
  // 在最后插入新的规则
  // 重置cache
  push (ruleName, fn, options):void

  // Enable rules with given names.
  // 启用指定列表里的规则
  // 重置cache
  enable (list: array, ignoreInvalid: boolean): array

  // Enable rules with given names.
  // 启用指定列表里的规则
  enableOnly (list: array, ignoreInvalid: boolean): void

  // Disable rules with given names.
  // 禁用指定列表里的规则
  // 重置cache
  disable (list: array, ignoreInvalid: boolean): array

  // Return array of active functions (rules) for given chain name.
  // 获取缓存的规则名字
  getRules (chainName: string): array

  __rules__: RuleItem[]

  __cache__: null

}
```