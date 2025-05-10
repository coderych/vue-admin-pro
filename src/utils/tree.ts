export interface TreeOption {
  id?: string
  parentId?: string
  children?: string
}

export type Key = string | number

/**
 * 列表转树
 *
 * @param list 列表
 * @param option 选项
 * @returns 树
 */
export function listToTree<T extends Record<string, any>>(list: T[], option: TreeOption = {}): T[] {
  if (!list?.length) {
    return []
  }
  const { id = 'id', parentId = 'parentId', children = 'children' } = option
  const nodeMap = new Map<Key, T>(
    list.map(node => [node[id], node]),
  )

  // 引入虚拟根节点来统一实现 parent 始终有效，避免空判断
  const root = {} as Partial<T>
  list.forEach((node: T) => {
    const parent = nodeMap.get(node[parentId]) ?? root;
    ((parent[children] as T[]) ??= []).push(node)
  })

  return root.children ?? []
}

/**
 * 树转列表
 * @param tree 树
 * @param option 选项
 * @returns 列表
 */
export function getParentsKeys(tree: any[], option: TreeOption = {}): Map<string, string[]> {
  const parentsKeys = new Map<string, string[]>()
  const { id = 'id', children = 'children' } = option

  function loop(node: any, parentKeys?: string[]) {
    if (!node)
      return
    // 如果是一级菜单，直接使用自己的key
    if (!parentKeys) {
      parentsKeys.set(node[id], [node[id]])
    }
    else {
      // 否则，使用父节点的key
      parentsKeys.set(node[id], parentKeys)
    }
    // 递归处理子节点
    if (node[children]) {
      const _parentKeys = parentKeys ? [...parentKeys, node[id]] : [node[id]]
      node[children].forEach((child: any) => loop(child, _parentKeys))
    }
  }

  tree.forEach((node: any) => loop(node))
  return parentsKeys
}
