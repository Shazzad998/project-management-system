<?php


return [

    'roles' => [
        'Admin',
        'User'
    ],

    'super_permissions' => [],

    'permissions' => [

        'user-management' => [
            'user-create',
            'user-list',
            'user-view',
            'user-edit',
            'user-delete'
        ],
        'role-management' => [
            'role-create',
            'role-list',
            'role-view',
            'role-edit',
            'role-delete'
        ],
        'project-management' => [
            'project-create',
            'project-list',
            'project-view',
            'project-edit',
            'project-delete'
        ],
        'task-management' => [
            'task-create',
            'task-list',
            'task-view',
            'task-edit',
            'task-delete'
        ],
    ]

];
