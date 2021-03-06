# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161009195639) do

  create_table "assigned_competence_levels", force: :cascade do |t|
    t.integer  "competence_id", limit: 4
    t.integer  "user_id",       limit: 4
    t.integer  "level",         limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "availabilities", force: :cascade do |t|
    t.integer  "user_id",    limit: 4,                    null: false
    t.datetime "starts_at",                               null: false
    t.datetime "ends_at"
    t.text     "comment",    limit: 65535
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.boolean  "active",                   default: true, null: false
    t.integer  "work_hours", limit: 4
    t.integer  "chance",     limit: 4,     default: 100,  null: false
  end

  create_table "competence_tier_groups", force: :cascade do |t|
    t.string   "title",       limit: 255,   null: false
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "competence_tiers", force: :cascade do |t|
    t.string   "title",                    limit: 255,               null: false
    t.text     "description",              limit: 65535
    t.integer  "competence_tier_group_id", limit: 4,                 null: false
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.integer  "level",                    limit: 4,     default: 0, null: false
  end

  create_table "competence_types", force: :cascade do |t|
    t.string   "title",                    limit: 255,                  null: false
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.integer  "competence_tier_group_id", limit: 4
    t.integer  "priority",                 limit: 4,     default: 0
    t.boolean  "show_title",                             default: true, null: false
    t.text     "description",              limit: 65535,                null: false
  end

  create_table "competences", force: :cascade do |t|
    t.string   "title",              limit: 255, null: false
    t.integer  "competence_type_id", limit: 4
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "pending_competence_levels", force: :cascade do |t|
    t.integer  "competence_id", limit: 4
    t.integer  "user_id",       limit: 4
    t.integer  "level",         limit: 4
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.boolean  "notified",                default: false, null: false
  end

  create_table "person_requests", force: :cascade do |t|
    t.integer  "user_id",    limit: 4,                   null: false
    t.integer  "target_id",  limit: 4,                   null: false
    t.datetime "starts_at",                              null: false
    t.datetime "ends_at"
    t.integer  "chance",     limit: 4,     default: 100, null: false
    t.string   "title",      limit: 255,   default: "",  null: false
    t.text     "comment",    limit: 65535
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.boolean  "confirmed"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title",      limit: 255,                   null: false
    t.text     "short_text", limit: 65535,                 null: false
    t.text     "text",       limit: 65535,                 null: false
    t.boolean  "published",                default: false, null: false
    t.boolean  "front_page",               default: false, null: false
    t.boolean  "important",                default: false, null: false
    t.integer  "user_id",    limit: 4,                     null: false
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  create_table "report_saved_queries", force: :cascade do |t|
    t.integer  "report_id",      limit: 4, null: false
    t.integer  "saved_query_id", limit: 4, null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "reports", force: :cascade do |t|
    t.string   "name",        limit: 255, default: "",    null: false
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.boolean  "unpublished",             default: false, null: false
    t.integer  "user_id",     limit: 4
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name",          limit: 255
    t.integer  "resource_id",   limit: 4
    t.string   "resource_type", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "saved_queries", force: :cascade do |t|
    t.string   "name",              limit: 255, default: "",    null: false
    t.boolean  "match_all",                     default: false, null: false
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.boolean  "show_pending",                  default: false
    t.boolean  "unpublished",                   default: false, null: false
    t.integer  "user_id",           limit: 4
    t.boolean  "only_subordinates",             default: false, null: false
  end

  create_table "saved_query_competences", force: :cascade do |t|
    t.integer  "saved_query_id", limit: 4, null: false
    t.integer  "competence_id",  limit: 4, null: false
    t.integer  "level",          limit: 4, null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "skills", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                           limit: 255, default: "",      null: false
    t.string   "encrypted_password",              limit: 255, default: "",      null: false
    t.string   "reset_password_token",            limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                   limit: 4,   default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",              limit: 255
    t.string   "last_sign_in_ip",                 limit: 255
    t.datetime "created_at",                                                    null: false
    t.datetime "updated_at",                                                    null: false
    t.integer  "godfather_id",                    limit: 4
    t.string   "first_name",                      limit: 255, default: "",      null: false
    t.string   "last_name",                       limit: 255, default: "",      null: false
    t.string   "cv_file_name",                    limit: 255
    t.string   "cv_content_type",                 limit: 255
    t.integer  "cv_file_size",                    limit: 4
    t.datetime "cv_updated_at"
    t.datetime "last_seen_by_godfather"
    t.datetime "last_seen_relevant"
    t.datetime "last_seen_requested"
    t.boolean  "receive_email",                               default: true,    null: false
    t.string   "confirmation_token",              limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",               limit: 255
    t.string   "mail_frequency",                  limit: 255, default: "1week", null: false
    t.datetime "last_expired_availability_check"
    t.boolean  "mail_for_expired_availabilities",             default: false,   null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id", limit: 4
    t.integer "role_id", limit: 4
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

  create_table "users_skills", force: :cascade do |t|
    t.integer  "user_id",    limit: 4,                 null: false
    t.integer  "skill_id",   limit: 4,                 null: false
    t.boolean  "confirmed",            default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
