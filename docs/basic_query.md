## Admins 表

### Create (插入)
```sql
INSERT INTO admins (user_name, password, email) 
VALUES ('admin1', 'hashed_password', 'admin1@example.com');
```

### Read (查询)
```sql
-- 查询所有管理员
SELECT * FROM admins;

-- 查询特定管理员
SELECT * FROM admins WHERE _id = 1;
```

### Update (更新)
```sql
UPDATE admins 
SET last_login = CURRENT_TIMESTAMP 
WHERE _id = 1;
```

### Delete (删除)
```sql
DELETE FROM admins WHERE _id = 1;
```

## Galleries 表

### Create (插入)
```sql
INSERT INTO galleries (name, user_id) 
VALUES ('My First Gallery', 1);
```

### Read (查询)
```sql
-- 查询所有画廊
SELECT * FROM galleries;

-- 查询特定用户的画廊
SELECT * FROM galleries WHERE user_id = 1;
```

### Update (更新)
```sql
UPDATE galleries 
SET name = 'Updated Gallery Name', updated_at = CURRENT_TIMESTAMP 
WHERE _id = 1;
```

### Delete (删除)
```sql
DELETE FROM galleries WHERE _id = 1;
```

## Images 表

### Create (插入)
```sql
INSERT INTO images (name, size, type, data, gallery_id) 
VALUES ('image1.jpg', 1024, 'image/jpeg', 'base64_encoded_data', 1);
```

### Read (查询)
```sql
-- 查询所有图片
SELECT * FROM images;

-- 查询特定画廊的图片
SELECT * FROM images WHERE gallery_id = 1;
```

### Update (更新)
```sql
UPDATE images 
SET name = 'updated_image_name.jpg' 
WHERE _id = 1;
```

### Delete (删除)
```sql
DELETE FROM images WHERE _id = 1;
```

## Users 表

### Create (插入)
```sql
INSERT INTO users (user_name, password, email) 
VALUES ('user1', 'hashed_password', 'user1@example.com');
```

### Read (查询)
```sql
-- 查询所有用户
SELECT * FROM users;

-- 查询特定用户
SELECT * FROM users WHERE _id = 1;
```

### Update (更新)
```sql
UPDATE users 
SET last_login = CURRENT_TIMESTAMP 
WHERE _id = 1;
```

### Delete (删除)
```sql
DELETE FROM users WHERE _id = 1;
```

当然可以。我会为您提供一些更复杂的查询示例，包括您提到的需求以及一些可能有用的其他查询。

## 复杂查询示例

### 通过用户ID获取所有画廊
```sql
SELECT g.*
FROM galleries g
WHERE g.user_id = :user_id;
```

### 根据画廊ID获取所有图片
```sql
SELECT i.*
FROM images i
WHERE i.gallery_id = :gallery_id;
```

### 获取用户及其所有画廊
```sql
SELECT u.*, g.*
FROM users u
LEFT JOIN galleries g ON u._id = g.user_id
WHERE u._id = :user_id;
```

### 获取画廊及其所有图片
```sql
SELECT g.*, i.*
FROM galleries g
LEFT JOIN images i ON g._id = i.gallery_id
WHERE g._id = :gallery_id;
```

### 获取用户、其画廊和图片数量
```sql
SELECT u.user_name, g.name AS gallery_name, COUNT(i._id) AS image_count
FROM users u
LEFT JOIN galleries g ON u._id = g.user_id
LEFT JOIN images i ON g._id = i.gallery_id
GROUP BY u._id, g._id
ORDER BY u.user_name, g.name;
```

### 获取最近上传图片的用户
```sql
SELECT u.user_name, i.name AS image_name, i.upload_at
FROM users u
JOIN galleries g ON u._id = g.user_id
JOIN images i ON g._id = i.gallery_id
ORDER BY i.upload_at DESC
LIMIT 10;
```

### 获取每个用户的画廊数量
```sql
SELECT u.user_name, COUNT(g._id) AS gallery_count
FROM users u
LEFT JOIN galleries g ON u._id = g.user_id
GROUP BY u._id
ORDER BY gallery_count DESC;
```

### 获取大小超过特定值的图片及其所属画廊和用户
```sql
SELECT u.user_name, g.name AS gallery_name, i.name AS image_name, i.size
FROM images i
JOIN galleries g ON i.gallery_id = g._id
JOIN users u ON g.user_id = u._id
WHERE i.size > :size_threshold
ORDER BY i.size DESC;
```

### 获取最近登录的管理员
```sql
SELECT user_name, last_login
FROM admins
WHERE last_login IS NOT NULL
ORDER BY last_login DESC
LIMIT 5;
```

### 获取没有画廊的用户
```sql
SELECT u.*
FROM users u
LEFT JOIN galleries g ON u._id = g.user_id
WHERE g._id IS NULL;
```