insert into "credentials" ("username", "hashedPassword")
values ('test', '$argon2i$v=19$m=4096,t=3,p=1$fL8yC/yIvlnx+WDvFdedDA$4EG0LFH/W/CUOekumGQpzswUD4j22VDYVnhJx4Emzqk');

insert into "users" ("gender", "age", "height", "currentWeight", "goalWeight", "activityLevel")
values ('Female', 27, 64, 150, 130, 'lightly active')
