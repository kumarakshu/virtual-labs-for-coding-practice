-- Insert sample problems for Virtual Labs
INSERT INTO problems (title, slug, difficulty, category, description, constraints, examples, starter_code, time_limit, memory_limit) VALUES 
(
    'Two Sum',
    'two-sum',
    'Easy',
    'Array',
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    '2 ≤ nums.length ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\n-10⁹ ≤ target ≤ 10⁹\nOnly one valid answer exists.',
    JSON_ARRAY(
        JSON_OBJECT('input', 'nums = [2,7,11,15], target = 9', 'output', '[0,1]', 'explanation', 'Because nums[0] + nums[1] == 9, we return [0, 1].'),
        JSON_OBJECT('input', 'nums = [3,2,4], target = 6', 'output', '[1,2]', 'explanation', 'Because nums[1] + nums[2] == 6, we return [1, 2].')
    ),
    JSON_OBJECT(
        'javascript', 'function twoSum(nums, target) {\n    // Write your solution here\n    \n}',
        'python', 'def two_sum(nums, target):\n    # Write your solution here\n    pass',
        'java', 'public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n    }\n}',
        'cpp', 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        \n    }\n};'
    ),
    1000,
    256
),
(
    'Reverse Linked List',
    'reverse-linked-list',
    'Easy',
    'Linked List',
    'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    'The number of nodes in the list is the range [0, 5000].\n-5000 ≤ Node.val ≤ 5000',
    JSON_ARRAY(
        JSON_OBJECT('input', 'head = [1,2,3,4,5]', 'output', '[5,4,3,2,1]', 'explanation', 'The linked list is reversed.'),
        JSON_OBJECT('input', 'head = [1,2]', 'output', '[2,1]', 'explanation', 'The linked list is reversed.')
    ),
    JSON_OBJECT(
        'javascript', 'function reverseList(head) {\n    // Write your solution here\n    \n}',
        'python', 'def reverse_list(head):\n    # Write your solution here\n    pass',
        'java', 'public class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your solution here\n        \n    }\n}',
        'cpp', 'class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your solution here\n        \n    }\n};'
    ),
    1000,
    256
),
(
    'Valid Parentheses',
    'valid-parentheses',
    'Easy',
    'Stack',
    'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    '1 ≤ s.length ≤ 10⁴\ns consists of parentheses only ''()[]{}''.',
    JSON_ARRAY(
        JSON_OBJECT('input', 's = "()"', 'output', 'true', 'explanation', 'The string contains valid parentheses.'),
        JSON_OBJECT('input', 's = "()[]{}"', 'output', 'true', 'explanation', 'All brackets are properly closed.'),
        JSON_OBJECT('input', 's = "(]"', 'output', 'false', 'explanation', 'Brackets are not properly matched.')
    ),
    JSON_OBJECT(
        'javascript', 'function isValid(s) {\n    // Write your solution here\n    \n}',
        'python', 'def is_valid(s):\n    # Write your solution here\n    pass',
        'java', 'public class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n        \n    }\n}',
        'cpp', 'class Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n        \n    }\n};'
    ),
    1000,
    256
),
(
    'Merge Two Sorted Lists',
    'merge-two-sorted-lists',
    'Easy',
    'Linked List',
    'You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.',
    'The number of nodes in both lists is in the range [0, 50].\n-100 ≤ Node.val ≤ 100\nBoth list1 and list2 are sorted in non-decreasing order.',
    JSON_ARRAY(
        JSON_OBJECT('input', 'list1 = [1,2,4], list2 = [1,3,4]', 'output', '[1,1,2,3,4,4]', 'explanation', 'The merged list is sorted.'),
        JSON_OBJECT('input', 'list1 = [], list2 = []', 'output', '[]', 'explanation', 'Both lists are empty.')
    ),
    JSON_OBJECT(
        'javascript', 'function mergeTwoLists(list1, list2) {\n    // Write your solution here\n    \n}',
        'python', 'def merge_two_lists(list1, list2):\n    # Write your solution here\n    pass',
        'java', 'public class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your solution here\n        \n    }\n}',
        'cpp', 'class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write your solution here\n        \n    }\n};'
    ),
    1000,
    256
),
(
    'Binary Tree Inorder Traversal',
    'binary-tree-inorder-traversal',
    'Medium',
    'Tree',
    'Given the root of a binary tree, return the inorder traversal of its nodes'' values.',
    'The number of nodes in the tree is in the range [0, 100].\n-100 ≤ Node.val ≤ 100',
    JSON_ARRAY(
        JSON_OBJECT('input', 'root = [1,null,2,3]', 'output', '[1,3,2]', 'explanation', 'Inorder traversal: left, root, right.'),
        JSON_OBJECT('input', 'root = []', 'output', '[]', 'explanation', 'Empty tree returns empty array.')
    ),
    JSON_OBJECT(
        'javascript', 'function inorderTraversal(root) {\n    // Write your solution here\n    \n}',
        'python', 'def inorder_traversal(root):\n    # Write your solution here\n    pass',
        'java', 'public class Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        // Write your solution here\n        \n    }\n}',
        'cpp', 'class Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        // Write your solution here\n        \n    }\n};'
    ),
    1000,
    256
);

-- Insert test cases for the problems
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
-- Two Sum test cases
(1, '[2,7,11,15]\n9', '[0,1]', TRUE),
(1, '[3,2,4]\n6', '[1,2]', TRUE),
(1, '[3,3]\n6', '[0,1]', FALSE),
(1, '[1,2,3,4,5]\n9', '[3,4]', FALSE),

-- Reverse Linked List test cases
(2, '[1,2,3,4,5]', '[5,4,3,2,1]', TRUE),
(2, '[1,2]', '[2,1]', TRUE),
(2, '[]', '[]', FALSE),
(2, '[1]', '[1]', FALSE),

-- Valid Parentheses test cases
(3, '()', 'true', TRUE),
(3, '()[]{}', 'true', TRUE),
(3, '(]', 'false', TRUE),
(3, '([)]', 'false', FALSE),
(3, '{[]}', 'true', FALSE),

-- Merge Two Sorted Lists test cases
(4, '[1,2,4]\n[1,3,4]', '[1,1,2,3,4,4]', TRUE),
(4, '[]\n[]', '[]', TRUE),
(4, '[]\n[0]', '[0]', FALSE),
(4, '[1,2,3]\n[4,5,6]', '[1,2,3,4,5,6]', FALSE),

-- Binary Tree Inorder Traversal test cases
(5, '[1,null,2,3]', '[1,3,2]', TRUE),
(5, '[]', '[]', TRUE),
(5, '[1]', '[1]', FALSE),
(5, '[1,2,3,4,5]', '[4,2,5,1,3]', FALSE);
