# 手写 Valtio 数据流

基本思路

- 基于 Proxy
- 通过 set 记录变更，比如 let version = 0; const foo = new Proxy({}, set() { version += 1; }) 然后 foo.bar = 1 就能记录了
- 提供 snapshot 方法访问当前快照，version 有变时才生成新的
- 提供 subscribe 方法，在 set 里执行注册的所有 listener
- 通过 snapshot + subscribe 把 mutable state 连接到 react
- 除此之外，还要支持嵌套对象、以及对象是数组的场景
- 然后基本流程就 ok 了，但别高兴，这不是结束，而是开始，接下来需要面对的是大量的 edge case

- TODO: https://blog.axlight.com/posts/how-valtio-proxy-state-works-vanilla-part/
