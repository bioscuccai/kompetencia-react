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

ActiveRecord::Schema.define(version: 20160417051329) do

  create_table "assigned_competence_levels", force: :cascade do |t|
    t.integer  "competence_id"
    t.integer  "user_id"
    t.integer  "level"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "availabilities", force: :cascade do |t|
    t.integer  "user_id",                   null: false
    t.datetime "starts_at",                 null: false
    t.datetime "ends_at"
    t.text     "comment",    default: "",   null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.boolean  "active",     default: true, null: false
  end

  create_table "competence_tier_groups", force: :cascade do |t|
    t.string   "title",                    null: false
    t.text     "description", default: "", null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "competence_tiers", force: :cascade do |t|
    t.string   "title",                                 null: false
    t.text     "description",              default: "", null: false
    t.integer  "competence_tier_group_id",              null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.integer  "level",                    default: 0,  null: false
  end

  create_table "competence_types", force: :cascade do |t|
    t.string   "title",                    null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "competence_tier_group_id"
  end

  create_table "competences", force: :cascade do |t|
    t.string   "title",              null: false
    t.integer  "competence_type_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "pending_competence_levels", force: :cascade do |t|
    t.integer  "competence_id"
    t.integer  "user_id"
    t.integer  "level"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "person_requests", force: :cascade do |t|
    t.integer  "user_id",                  null: false
    t.integer  "target_id",                null: false
    t.datetime "starts_at",                null: false
    t.datetime "ends_at"
    t.integer  "chance",     default: 100, null: false
    t.string   "title",      default: "",  null: false
    t.text     "comment",    default: "",  null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.boolean  "confirmed"
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
  add_index "roles", ["name"], name: "index_roles_on_name"

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "godfather_id"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"

end
