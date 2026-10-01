export const TOPICS = [
  { id: 'all', name: 'All Topics', icon: 'Layers', color: 'indigo' },
  { id: 'arrays', name: 'Arrays & Strings', icon: 'Grid', color: 'blue', desc: 'Sliding window, two pointers, prefix sums' },
  { id: 'linked-lists', name: 'Linked Lists', icon: 'GitCommit', color: 'emerald', desc: 'Fast & slow pointers, reversal, cycles' },
  { id: 'stacks-queues', name: 'Stacks & Queues', icon: 'Layers', color: 'amber', desc: 'Monotonic stacks, deque, sliding windows' },
  { id: 'trees', name: 'Trees & BST', icon: 'Network', color: 'teal', desc: 'Traversals, LCA, validation, height' },
  { id: 'graphs', name: 'Graphs', icon: 'Share2', color: 'purple', desc: 'BFS, DFS, Dijkstra, TopoSort, Disjoint Set' },
  { id: 'dp', name: 'Dynamic Programming', icon: 'Cpu', color: 'rose', desc: 'Knapsack, memoization, LCS, grid paths' },
  { id: 'sorting-searching', name: 'Sorting & Searching', icon: 'Search', color: 'cyan', desc: 'Binary search variants, quicksort, mergesort' },
  { id: 'complexity', name: 'Complexity & Math', icon: 'Activity', color: 'violet', desc: 'Big-O bounds, bitwise tricks, recurrence' }
];

export const DSA_QUESTIONS = [
  // ==================== ARRAYS & STRINGS ====================
  {
    id: 'arr-1',
    topic: 'arrays',
    difficulty: 'Easy',
    question: 'What is the time complexity to find the maximum element in an unsorted array of size N?',
    code: `int findMax(vector<int>& nums) {
    int maxVal = nums[0];
    for(int i = 1; i < nums.size(); i++) {
        if(nums[i] > maxVal) maxVal = nums[i];
    }
    return maxVal;
}`,
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(1)'],
    correctAnswer: 1,
    explanation: 'Since the array is unsorted, we must inspect each element at least once to ensure no larger value exists, resulting in linear O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    hint: 'Think about whether any elements can be skipped without checking them.'
  },
  {
    id: 'arr-2',
    topic: 'arrays',
    difficulty: 'Medium',
    question: 'In the Two Sum problem using a Hash Map, what is the best achievable average Time and Auxiliary Space complexity?',
    code: `// Hash Map lookup method
unordered_map<int, int> seen;
for(int i = 0; i < nums.size(); i++) {
    int complement = target - nums[i];
    if(seen.count(complement)) return {seen[complement], i};
    seen[nums[i]] = i;
}`,
    options: [
      'Time: O(N log N), Space: O(1)',
      'Time: O(N), Space: O(N)',
      'Time: O(N^2), Space: O(1)',
      'Time: O(N), Space: O(1)'
    ],
    correctAnswer: 1,
    explanation: 'A single pass through the array with O(1) hash map operations gives O(N) total time, storing up to N elements in the map requiring O(N) auxiliary space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    hint: 'Trading memory space for constant-time lookups is the classic hashing technique.'
  },
  {
    id: 'arr-3',
    topic: 'arrays',
    difficulty: 'Medium',
    question: 'Kadane’s Algorithm is used to solve which of the following problems efficiently in O(N) time?',
    code: `int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0], currentMax = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        currentMax = max(nums[i], currentMax + nums[i]);
        maxSoFar = max(maxSoFar, currentMax);
    }
    return maxSoFar;
}`,
    options: [
      'Finding the longest palindromic substring',
      'Maximum subarray sum in contiguous elements',
      'Finding the longest increasing subsequence',
      'Searching an element in a rotated sorted array'
    ],
    correctAnswer: 1,
    explanation: 'Kadane\'s algorithm finds the contiguous subarray within a one-dimensional array of numbers which has the largest sum in O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    hint: 'At each index, decide whether to extend the previous subarray or start fresh with current element.'
  },
  {
    id: 'arr-4',
    topic: 'arrays',
    difficulty: 'Hard',
    question: 'In the "Trapping Rain Water" problem, what is the space complexity of the optimal Two-Pointer approach?',
    options: [
      'O(N) auxiliary space',
      'O(N log N) auxiliary space',
      'O(1) auxiliary space',
      'O(sqrt(N)) auxiliary space'
    ],
    correctAnswer: 2,
    explanation: 'By maintaining left_max and right_max pointers from both sides, water trapped can be calculated on the fly without extra prefix/suffix max arrays, achieving O(1) extra space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    hint: 'Compare left_max and right_max to safely accumulate water on the shorter side.'
  },
  {
    id: 'arr-5',
    topic: 'arrays',
    difficulty: 'Easy',
    question: 'What is the time complexity to reverse an array of size N in-place using two pointers?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctAnswer: 2,
    explanation: 'Using two pointers from the left and right ends swapping elements towards the center takes N/2 swaps, which is O(N) linear time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    hint: 'Left pointer moves right, right pointer moves left until they meet in the middle.'
  },
  {
    id: 'arr-6',
    topic: 'arrays',
    difficulty: 'Hard',
    question: 'In the Sliding Window Maximum problem for window size K in an array of size N, which data structure achieves O(N) overall time?',
    options: [
      'Monotonic Deque (Double Ended Queue)',
      'Binary Search Tree (AVL Tree)',
      'Max Heap (Priority Queue)',
      'Min Stack'
    ],
    correctAnswer: 0,
    explanation: 'A monotonic decreasing deque stores indices of relevant maximum elements. Each index is pushed and popped from the deque at most once, yielding O(N) overall time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    hint: 'Pop smaller elements from the back before pushing the current element.'
  },

  // ==================== LINKED LISTS ====================
  {
    id: 'll-1',
    topic: 'linked-lists',
    difficulty: 'Easy',
    question: 'Floyd\'s Cycle Detection (Tortoise and Hare) algorithm uses two pointers moving at speeds of:',
    code: `ListNode *slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) return true; // Cycle detected
}`,
    options: [
      '1 step and 3 steps',
      '1 step and 2 steps',
      '2 steps and 3 steps',
      'Both move at 1 step but from different starting nodes'
    ],
    correctAnswer: 1,
    explanation: 'Slow moves 1 step and fast moves 2 steps per iteration. In a cycle of length C, the relative distance between them decreases by 1 step each loop until they meet in O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    hint: 'One pointer moves twice as fast as the other.'
  },
  {
    id: 'll-2',
    topic: 'linked-lists',
    difficulty: 'Medium',
    question: 'How do you reverse a Singly Linked List iteratively with O(1) space?',
    code: `ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
    options: [
      'Use a stack to push all elements and pop them',
      'Use three pointers: prev, curr, and nextTemp',
      'Convert the linked list into an array, reverse it and rebuild',
      'Swap the node values from both ends'
    ],
    correctAnswer: 1,
    explanation: 'The three-pointer approach (prev, curr, nextTemp) flips the next pointer of each node to point to prev in a single pass using O(1) space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    hint: 'Store next node before breaking the current pointer.'
  },
  {
    id: 'll-3',
    topic: 'linked-lists',
    difficulty: 'Hard',
    question: 'To merge K sorted linked lists with N total nodes, what is the optimal time complexity using a Min-Heap?',
    options: [
      'O(N * K)',
      'O(N log K)',
      'O(N^2)',
      'O(K log N)'
    ],
    correctAnswer: 1,
    explanation: 'Maintaining a min-heap of size K containing the current heads of the K lists allows extracting the minimum in O(log K). Doing this for all N nodes yields O(N log K) time.',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    hint: 'The heap size never needs to exceed K.'
  },
  {
    id: 'll-4',
    topic: 'linked-lists',
    difficulty: 'Easy',
    question: 'What is the time complexity to insert a node at the head of a Singly Linked List if head pointer is given?',
    options: ['O(N)', 'O(log N)', 'O(1)', 'O(N^2)'],
    correctAnswer: 2,
    explanation: 'Creating a new node and updating its next pointer to the current head takes a fixed number of operations, which is O(1) constant time.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    hint: 'No traversal is necessary.'
  },

  // ==================== STACKS & QUEUES ====================
  {
    id: 'sq-1',
    topic: 'stacks-queues',
    difficulty: 'Medium',
    question: 'Which data structure is ideal for finding the Next Greater Element for each item in an array in O(N) overall time?',
    options: [
      'Binary Search Tree',
      'Monotonic Decreasing Stack',
      'Priority Queue (Min Heap)',
      'Double-ended Queue (Deque) sorted descending'
    ],
    correctAnswer: 1,
    explanation: 'A monotonic decreasing stack stores indices or values in decreasing order. When a larger element is encountered, smaller elements are popped, achieving O(N) total amortized time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    hint: 'Each element is pushed and popped at most once.'
  },
  {
    id: 'sq-2',
    topic: 'stacks-queues',
    difficulty: 'Easy',
    question: 'To implement a Queue using two Stacks, what is the amortized time complexity of the dequeue operation?',
    options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
    correctAnswer: 1,
    explanation: 'Although transferring elements between stackIn and stackOut takes O(N) worst-case on empty stackOut, each element is pushed and popped exactly twice, yielding O(1) amortized cost per operation.',
    timeComplexity: 'O(1) Amortized',
    spaceComplexity: 'O(N)',
    hint: 'Look at total operations distributed across N items.'
  },
  {
    id: 'sq-3',
    topic: 'stacks-queues',
    difficulty: 'Hard',
    question: 'In the "Largest Rectangle in Histogram" problem, what is the time complexity achieved using a Monotonic Increasing Stack?',
    options: ['O(N log N)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctAnswer: 1,
    explanation: 'By maintaining an increasing stack of bar indices, we compute the maximum rectangle with each bar as the shortest building in single pass O(N) amortized time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    hint: 'Each bar index is pushed onto the stack and popped from the stack at most once.'
  },

  // ==================== TREES & BST ====================
  {
    id: 'tree-1',
    topic: 'trees',
    difficulty: 'Easy',
    question: 'Which traversal of a Binary Search Tree (BST) produces keys in strictly sorted ascending order?',
    options: [
      'Pre-order (Root, Left, Right)',
      'In-order (Left, Root, Right)',
      'Post-order (Left, Right, Root)',
      'Level-order (Breadth First)'
    ],
    correctAnswer: 1,
    explanation: 'In-order traversal visits all nodes in Left subtree (smaller), then Root (current), then Right subtree (greater), producing sorted ascending order for BSTs.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H) recursion stack',
    hint: 'Left < Node < Right'
  },
  {
    id: 'tree-2',
    topic: 'trees',
    difficulty: 'Medium',
    question: 'In a Balanced Binary Search Tree (like AVL or Red-Black Tree) with N nodes, what is the worst-case search time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctAnswer: 1,
    explanation: 'Self-balancing BSTs guarantee that the height of the tree is bounded by O(log N), making Search, Insert, and Delete O(log N) in worst case.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    hint: 'Height of balanced binary trees scales logarithmically.'
  },
  {
    id: 'tree-3',
    topic: 'trees',
    difficulty: 'Hard',
    question: 'What is the Lowest Common Ancestor (LCA) property in a Binary Tree?',
    code: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}`,
    options: [
      'The deepest node that has both p and q as descendants',
      'The root node of the binary tree',
      'The lowest leaf node between p and q',
      'The parent node with maximum subtree height'
    ],
    correctAnswer: 0,
    explanation: 'The lowest common ancestor is defined between two nodes p and q as the lowest (deepest) node in T that has both p and q as descendants (where a node can be a descendant of itself).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    hint: 'LCA is the deepest split point where p and q diverge.'
  },
  {
    id: 'tree-4',
    topic: 'trees',
    difficulty: 'Easy',
    question: 'What is the maximum number of nodes in a Binary Tree of height H (where root is at height 1)?',
    options: ['2^H - 1', '2^(H-1)', '2^H', 'H^2'],
    correctAnswer: 0,
    explanation: 'Summing nodes across levels 1 through H: 1 + 2 + 4 + ... + 2^(H-1) = 2^H - 1.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    hint: 'Think of a full binary tree.'
  },

  // ==================== GRAPHS ====================
  {
    id: 'graph-1',
    topic: 'graphs',
    difficulty: 'Medium',
    question: 'Dijkstra\'s algorithm finds single-source shortest paths on graphs with:',
    options: [
      'Any weights, including negative cycles',
      'Only non-negative edge weights',
      'Unweighted graphs only',
      'Only directed acyclic graphs (DAGs)'
    ],
    correctAnswer: 1,
    explanation: 'Dijkstra\'s greedy assumption requires non-negative edge weights. For graphs with negative edge weights, Bellman-Ford or SPFA should be used.',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    hint: 'Once a node is marked visited in Dijkstra, its distance is finalized assuming no future negative edge can reduce it.'
  },
  {
    id: 'graph-2',
    topic: 'graphs',
    difficulty: 'Medium',
    question: 'Kahn\'s Algorithm for Topological Sorting uses which traversal strategy?',
    options: [
      'DFS with recursion stack',
      'BFS using in-degrees of vertices',
      'Dijkstra\'s priority queue',
      'Disjoint Set Union (DSU)'
    ],
    correctAnswer: 1,
    explanation: 'Kahn\'s algorithm computes the in-degree of all nodes, pushes nodes with in-degree 0 into a queue, and iteratively removes edges, resulting in a topological order or detecting cycles if fewer than V nodes are visited.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    hint: 'Nodes with zero incoming dependencies can be processed first.'
  },
  {
    id: 'graph-3',
    topic: 'graphs',
    difficulty: 'Hard',
    question: 'What is the time complexity of Disjoint Set Union (DSU) operations with Path Compression and Union by Rank?',
    options: [
      'O(log V)',
      'O(α(V)) (Inverse Ackermann function, practically O(1))',
      'O(V)',
      'O(V log V)'
    ],
    correctAnswer: 1,
    explanation: 'Combining path compression and union by rank yields nearly constant time per operation, bounded by O(α(N)) where α is the inverse Ackermann function (α(N) < 5 for any practical N).',
    timeComplexity: 'O(α(V)) ≈ O(1)',
    spaceComplexity: 'O(V)',
    hint: 'Inverse Ackermann function grows extraordinarily slowly.'
  },
  {
    id: 'graph-4',
    topic: 'graphs',
    difficulty: 'Easy',
    question: 'Which algorithm is best suited for finding the shortest path in an unweighted graph?',
    options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Bellman-Ford', 'Floyd-Warshall'],
    correctAnswer: 0,
    explanation: 'BFS explores neighbor vertices layer by layer in increasing distance from the source, guaranteeing shortest path in unweighted graphs in O(V + E) time.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    hint: 'Layer-by-layer exploration using a FIFO queue.'
  },

  // ==================== DYNAMIC PROGRAMMING ====================
  {
    id: 'dp-1',
    topic: 'dp',
    difficulty: 'Easy',
    question: 'What are the two core prerequisites for a problem to be solved using Dynamic Programming?',
    options: [
      'Greedy choice property and Sorting',
      'Overlapping Subproblems and Optimal Substructure',
      'Divide and Conquer and Binary Search',
      'Linear Space and Recursion depth < 100'
    ],
    correctAnswer: 1,
    explanation: 'Optimal substructure means optimal solutions to subproblems combine into optimal solutions of the overall problem. Overlapping subproblems means identical subproblems are solved repeatedly.',
    timeComplexity: 'Varies',
    spaceComplexity: 'Varies',
    hint: 'Think about why memoization works: remembering already calculated subproblems.'
  },
  {
    id: 'dp-2',
    topic: 'dp',
    difficulty: 'Medium',
    question: 'In the 0/1 Knapsack Problem with N items and Capacity W, what is the standard 2D DP time and space complexity?',
    code: `// dp[i][w] = max value considering first i items with weight limit w
for (int i = 1; i <= n; i++) {
    for (int w = 0; w <= W; w++) {
        if (wt[i-1] <= w)
            dp[i][w] = max(val[i-1] + dp[i-1][w - wt[i-1]], dp[i-1][w]);
        else
            dp[i][w] = dp[i-1][w];
    }
}`,
    options: [
      'Time: O(2^N), Space: O(N)',
      'Time: O(N * W), Space: O(N * W)',
      'Time: O(N log W), Space: O(W)',
      'Time: O(W^2), Space: O(N)'
    ],
    correctAnswer: 1,
    explanation: 'Filling the DP table takes N * W states, each computed in O(1) time. (Note: Space can also be optimized to O(W) with a 1D array).',
    timeComplexity: 'O(N * W)',
    spaceComplexity: 'O(N * W)',
    hint: 'Two nested loops over N items and W capacity.'
  },
  {
    id: 'dp-3',
    topic: 'dp',
    difficulty: 'Hard',
    question: 'In Longest Increasing Subsequence (LIS), what is the optimal time complexity achievable using Patience Sorting / Binary Search?',
    options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(2^N)'],
    correctAnswer: 1,
    explanation: 'While standard DP is O(N^2), maintaining the smallest tail elements of increasing subsequences with binary search (std::lower_bound) yields O(N log N) time.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    hint: 'Use binary search to replace or append into a tails array.'
  },
  {
    id: 'dp-4',
    topic: 'dp',
    difficulty: 'Medium',
    question: 'In the Coin Change Problem (minimum coins for amount A with C coin denominations), what is the DP time complexity?',
    options: ['O(A * C)', 'O(A^C)', 'O(C log A)', 'O(A + C)'],
    correctAnswer: 0,
    explanation: 'For each amount from 1 to A, we iterate through all C coins: dp[i] = min(dp[i], dp[i - coin] + 1), resulting in O(A * C) time.',
    timeComplexity: 'O(A * C)',
    spaceComplexity: 'O(A)',
    hint: 'Nested loop of amount from 1 to A and coin denominations.'
  },

  // ==================== SORTING & SEARCHING ====================
  {
    id: 'sort-1',
    topic: 'sorting-searching',
    difficulty: 'Easy',
    question: 'Which sorting algorithm is guaranteed to be stable and have an O(N log N) worst-case time complexity?',
    options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Selection Sort'],
    correctAnswer: 1,
    explanation: 'Merge sort always splits lists in half and merges sorted sub-arrays stably in O(N log N) worst, average, and best cases (though requiring O(N) auxiliary space).',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    hint: 'Divide, sort halves recursively, then merge stably.'
  },
  {
    id: 'sort-2',
    topic: 'sorting-searching',
    difficulty: 'Medium',
    question: 'In Quick Select algorithm for finding the k-th smallest element, what is the average time complexity?',
    options: ['O(N log N)', 'O(N)', 'O(log N)', 'O(N^2)'],
    correctAnswer: 1,
    explanation: 'Quickselect discards half the array at each partition on average: N + N/2 + N/4 + ... = 2N, giving O(N) average time complexity.',
    timeComplexity: 'O(N) avg, O(N^2) worst',
    spaceComplexity: 'O(1) iterative',
    hint: 'Sum of geometric series with ratio 1/2.'
  },
  {
    id: 'sort-3',
    topic: 'sorting-searching',
    difficulty: 'Hard',
    question: 'To find the median of two sorted arrays of sizes M and N in logarithmic time, what is the optimal binary search partition approach time complexity?',
    options: ['O(log(min(M, N)))', 'O(M + N)', 'O(log M * log N)', 'O(sqrt(M + N))'],
    correctAnswer: 0,
    explanation: 'By performing binary search on the partition index of the smaller array of size min(M, N), we achieve O(log(min(M, N))) time.',
    timeComplexity: 'O(log(min(M, N)))',
    spaceComplexity: 'O(1)',
    hint: 'Binary search on the smaller array cuts the search range in half each step.'
  },

  // ==================== COMPLEXITY & MATH ====================
  {
    id: 'comp-1',
    topic: 'complexity',
    difficulty: 'Easy',
    question: 'What is the bitwise trick `n & (n - 1)` used for in DSA?',
    options: [
      'Multiply n by 2',
      'Clears the lowest set bit of n',
      'Reverses the bits of n',
      'Checks if n is odd or even'
    ],
    correctAnswer: 1,
    explanation: 'Subtracting 1 flips all bits after and including the rightmost set bit. ANDing with n zeroes out that least significant set bit (Kernighan’s algorithm to count set bits).',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    hint: 'Notice how 12 (1100) & 11 (1011) becomes 8 (1000).'
  },
  {
    id: 'comp-2',
    topic: 'complexity',
    difficulty: 'Medium',
    question: 'According to the Master Theorem, what is the time complexity of T(n) = 2T(n/2) + O(n)?',
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'Here a=2, b=2, log_b(a) = log_2(2) = 1. Since f(n) = O(n^1), this is Case 2 of Master Theorem: T(n) = Θ(n^{log_b a} * log n) = O(n log n) (classic Merge Sort recurrence).',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    hint: 'This is the standard recurrence relation for Merge Sort.'
  },
  {
    id: 'comp-3',
    topic: 'complexity',
    difficulty: 'Hard',
    question: 'What is the time complexity to compute (A^B) % M using Modular Exponentiation (Binary Exponentiation)?',
    options: ['O(B)', 'O(log B)', 'O(sqrt(B))', 'O(1)'],
    correctAnswer: 1,
    explanation: 'Binary exponentiation squares the base and halves the exponent B in each step, taking O(log B) multiplications.',
    timeComplexity: 'O(log B)',
    spaceComplexity: 'O(1)',
    hint: 'Divide the power by 2 in each iteration.'
  }
];

export const DAILY_CHALLENGE = {
  id: 'daily-oct-1',
  date: 'October 1, 2026',
  title: 'LRU Cache Eviction & Time Complexity',
  topic: 'stacks-queues',
  difficulty: 'Medium',
  points: 150,
  question: 'In an LRU (Least Recently Used) Cache of capacity C, which data structure combination achieves both O(1) `get` and O(1) `put` operations?',
  code: `class LRUCache {
    int capacity;
    list<pair<int, int>> cacheList; // Doubly Linked List
    unordered_map<int, list<pair<int, int>>::iterator> map;
public:
    int get(int key);
    void put(int key, int value);
};`,
  options: [
    'Doubly Linked List + Hash Map',
    'Max Heap + Binary Search Array',
    'Singly Linked List + Stack',
    'Self-balancing BST (AVL Tree) + Queue'
  ],
  correctAnswer: 0,
  explanation: 'A Doubly Linked List allows O(1) node removal and insertion to the head/tail, while a Hash Map provides O(1) pointer lookup to any node in the list.',
  timeComplexity: 'O(1) for both operations',
  spaceComplexity: 'O(C) where C is capacity',
  hint: 'You need fast node splicing (O(1)) and fast key indexing (O(1)).'
};
