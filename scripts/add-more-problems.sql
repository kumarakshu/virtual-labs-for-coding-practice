-- Add more coding problems to increase variety
INSERT INTO problems (title, slug, difficulty, category, description, constraints, examples, starter_code, time_limit, memory_limit) VALUES 
(
    'Maximum Subarray',
    'maximum-subarray',
    'Medium',
    'Array',
    'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    '-10⁴ ≤ nums[i] ≤ 10⁴\n1 ≤ nums.length ≤ 10⁵',
    JSON_ARRAY(
        JSON_OBJECT('input', 'nums = [-2,1,-3,4,-1,2,1,-5,4]', 'output', '6', 'explanation', 'The subarray [4,-1,2,1] has the largest sum 6.'),
        JSON_OBJECT('input', 'nums = [1]', 'output', '1', 'explanation', 'Single element array.')
    ),
    JSON_OBJECT(
        'javascript', 'function maxSubArray(nums) {\n    // Write your solution here\n    \n}',
        'python', 'def max_sub_array(nums):\n    # Write your solution here\n    pass',
        'java', 'public class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your solution here\n        \n    }\n}',
        'cpp', 'class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Write your solution here\n        \n    }\n};'
    ),
    1000,
    256
),
(
    'Climbing Stairs',
    'climbing-stairs',
    'Easy',
    'Dynamic Programming',
    'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    '1 ≤ n ≤ 45',
    JSON_ARRAY(
        JSON_OBJECT('input', 'n = 2', 'output', '2', 'explanation', 'There are two ways: 1+1 and 2.'),
        JSON_OBJECT('input', 'n = 3', 'output', '3', 'explanation', 'There are three ways: 1+1+1, 1+2, and 2+1.')
    ),
    JSON_OBJECT(
        'javascript', 'function climbStairs(n) {\n    // Write your solution here\n    \n}',
        'python', 'def climb_stairs(n):\n    # Write your solution here\n    pass',
        'java', 'public class Solution {\n    public int climbStairs(int n) {\n        // Write your solution here\n        \n    }\n}',
        'cpp', 'class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your solution here\n        \n    }\n};'
    ),
    1000,
    256
),
(
    'Best Time to Buy and Sell Stock',
    'best-time-to-buy-and-sell-stock',
    'Easy',
    'Array',
    'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction.',
    '1 ≤ prices.length ≤ 10⁵\n0 ≤ prices[i] ≤ 10⁴',
    JSON_ARRAY(
        JSON_OBJECT('input', 'prices = [7,1,5,3,6,4]', 'output', '5', 'explanation', 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'),
        JSON_OBJECT('input', 'prices = [7,6,4,3,1]', 'output', '0', 'explanation', 'No profit can be made.')
    ),
    JSON_OBJECT(
        'javascript', 'function maxProfit(prices) {\n    // Write your solution here\n    \n}',
        'python', 'def max_profit(prices):\n    # Write your solution here\n    pass',
        'java', 'public class Solution {\n    public int maxProfit(int[] prices) {\n        // Write your solution here\n        \n    }\n}',
        'cpp', 'class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // Write your solution here\n        \n    }\n};'
    ),
    1000,
    256
),
(
    'Contains Duplicate',
    'contains-duplicate',
    'Easy',
    'Array',
    'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    '1 ≤ nums.length ≤ 10⁵\n-10⁹ ≤ nums[i] ≤ 10⁹',
    JSON_ARRAY(
        JSON_OBJECT('input', 'nums = [1,2,3,1]', 'output', 'true', 'explanation', 'The element 1 appears twice.'),
        JSON_OBJECT('input', 'nums = [1,2,3,4]', 'output', 'false', 'explanation', 'All elements are distinct.')
    ),
    JSON_OBJECT(
        'javascript', 'function containsDuplicate(nums) {\n    // Write your solution here\n    \n}',
        'python', 'def contains_duplicate(nums):\n    # Write your solution here\n    pass',
        'java', 'public class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Write your solution here\n        \n    }\n}',
        'cpp', 'class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // Write your solution here\n        \n    }\n};'
    ),
    1000,
    256
),
(
    'Product of Array Except Self',
    'product-of-array-except-self',
    'Medium',
    'Array',
    'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using the division operation.',
    '2 ≤ nums.length ≤ 10⁵\n-30 ≤ nums[i] ≤ 30',
    JSON_ARRAY(
        JSON_OBJECT('input', 'nums = [1,2,3,4]', 'output', '[24,12,8,6]', 'explanation', 'For each index, multiply all other elements.'),
        JSON_OBJECT('input', 'nums = [-1,1,0,-3,3]', 'output', '[0,0,9,0,0]', 'explanation', 'Handle zero elements correctly.')
    ),
    JSON_OBJECT(
        'javascript', 'function productExceptSelf(nums) {\n    // Write your solution here\n    \n}',
        'python', 'def product_except_self(nums):\n    # Write your solution here\n    pass',
        'java', 'public class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Write your solution here\n        \n    }\n}',
        'cpp', 'class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        // Write your solution here\n        \n    }\n};'
    ),
    1000,
    256
);

-- Add test cases for new problems
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
-- Maximum Subarray test cases
(6, '[-2,1,-3,4,-1,2,1,-5,4]', '6', TRUE),
(6, '[1]', '1', TRUE),
(6, '[5,4,-1,7,8]', '23', FALSE),

-- Climbing Stairs test cases  
(7, '2', '2', TRUE),
(7, '3', '3', TRUE),
(7, '5', '8', FALSE),

-- Best Time to Buy and Sell Stock test cases
(8, '[7,1,5,3,6,4]', '5', TRUE),
(8, '[7,6,4,3,1]', '0', TRUE),
(8, '[1,2,3,4,5]', '4', FALSE),

-- Contains Duplicate test cases
(9, '[1,2,3,1]', 'true', TRUE),
(9, '[1,2,3,4]', 'false', TRUE),
(9, '[1,1,1,3,3,4,3,2,4,2]', 'true', FALSE),

-- Product of Array Except Self test cases
(10, '[1,2,3,4]', '[24,12,8,6]', TRUE),
(10, '[-1,1,0,-3,3]', '[0,0,9,0,0]', TRUE),
(10, '[2,3,4,5]', '[60,40,30,24]', FALSE);
