-- base user, should be the minimal amount of data required to search and find users. 
create table users (
    id uuid primary key,
    email text unique,
    name text,
    profile_pic_url text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- the settings of the base user. Only be visible to the actual authenticated user
create table user_settings (
    user_id uuid primary key REFERENCES users(id),
    theme text default 'light',
    notification_preferences jsonb,
    language text default 'en',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- base toasters, should be the minimal amount of data required to search and find toasters
create table toasters (
    id uuid primary key,
    profile_pic_url text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- base toasters, should be the minimal amount of data required to search and find toasters
create table user_befriended_toasters (
    user_id uuid primary key,
    toaster_id 
    last_send_message text,
    favorite boolean
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- each toaster can have multiple connectitions to it, this means these users can change the toaster-settings and are verified
create table toaster_verified_users (
    id uuid primary key,
    user_id uuid REFERENCES users(id),
    toaster_id uuid REFERENCES toasters(id),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- the settings of the base toaster. Only be visible to the toaster_verified_users
create table toaster_settings (
    toaster_id uuid primary key REFERENCES toasters(id),
    internal_name text,
    do_not_disturb jsonb default '{"is_active": false, "start_time": "22:00", "end_time": "07:00"}'::jsonb,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
);

create table broadcasters (
    broadcast_id uuid primary key,
    creator_id uuid REFERENCES users(id),
    is_official boolean default false,
    name text,
    description text,
    settings jsonb
)

create table broadcast_subscribers (
    id uuid primary key,
    broadcast_id uuid REFERENCES broadcasters(broadcast_id),
    custom_settings jsonb, -- Override default template settings if needed
)

create table toaster_broadcast_settings (
    toaster_id uuid primary key REFERENCES toasters(id),
)