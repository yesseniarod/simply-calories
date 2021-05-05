set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

 create table "public"."credentials" (
  "userId"             serial,
  "username"           text              not null,
  "hashedPassword"     text              not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("username")
 );

create table "public"."users" (
  "userId"         serial,
  "gender"         text           not null,
  "age"            integer           not null,
  "height"         integer           not null,
  "currentWeight"  integer           not null,
  "goalWeight"     integer           not null,
  "activityLevel"  text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("userId"),
  foreign key ("userId")
  references "credentials" ("userId")
);

create table "public"."food-journal" (
  "foodId"         serial,
  "name"           text              not null,
  "calories"       integer           not null,
  "serving"        float             not null,
  "image"          text              not null,
  "unit"           text              not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("foodId")
);

create table "public"."workout-journal" (
  "workoutId"      serial,
  "name"           text              not null,
  "duration"       float             not null,
  "calories"       float             not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("workoutId")
 );
