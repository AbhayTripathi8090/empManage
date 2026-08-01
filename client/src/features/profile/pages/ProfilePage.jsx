import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser, selectAuthLoading, selectAuthError } from '../../auth/authSelector';
import { updateUserProfileThunk, changePasswordThunk, logoutUserThunk } from '../../auth/authThunk';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import ProfileDetailsForm from '../components/ProfileDetailsForm';
import ChangePasswordForm from '../components/ChangePasswordForm';
import { User, Key, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'security'
  const [successFeedback, setSuccessFeedback] = useState('');

  const handleUpdateProfile = async (formData) => {
    setSuccessFeedback('');
    const result = await dispatch(updateUserProfileThunk(formData));
    if (!result.error) {
      setSuccessFeedback('Profile information and avatar updated successfully!');
    }
  };

  const handleChangePassword = async (passwordData) => {
    setSuccessFeedback('');
    const result = await dispatch(changePasswordThunk(passwordData));
    if (!result.error) {
      setSuccessFeedback('Account password updated successfully!');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Header title="My Account Profile" subtitle="Manage your account profile, avatar, and security settings" />

      {/* Backend Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{typeof error === 'string' ? error : 'Failed to update account credentials.'}</span>
        </div>
      )}

      {/* Success Notification Banner */}
      {successFeedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
          <span>{successFeedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Hero Card */}
        <div className="surface-card p-6 rounded-2xl flex flex-col items-center text-center space-y-4 h-fit">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md ring-4 ring-teal-50"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-slate-950 text-teal-300 flex items-center justify-center font-black text-3xl ring-4 ring-white">
              {currentUser?.name ? currentUser.name[0].toUpperCase() : <User className="w-10 h-10" />}
            </div>
          )}

          <div>
            <h3 className="text-xl font-black text-slate-950">{currentUser?.name || 'Account User'}</h3>
            <p className="text-sm text-slate-500">{currentUser?.email || 'user@company.com'}</p>
          </div>

          <span className="px-3 py-1 text-xs font-black rounded-full bg-teal-50 text-teal-700 capitalize border border-teal-100">
            {currentUser?.role || 'Employee'}
          </span>

          <div className="w-full border-t border-slate-100 pt-4">
            <Button
              variant="danger"
              className="w-full"
              icon={LogOut}
              onClick={() => dispatch(logoutUserThunk())}
            >
              Log Out
            </Button>
          </div>
        </div>

        {/* Tabbed Form Section */}
        <div className="surface-card lg:col-span-2 rounded-2xl overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/70 p-2 gap-2">
            <button
              onClick={() => {
                setActiveTab('details');
                setSuccessFeedback('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'details'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              <User className="w-4 h-4" /> Personal Details
            </button>
            <button
              onClick={() => {
                setActiveTab('security');
                setSuccessFeedback('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'security'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              <Key className="w-4 h-4" /> Security & Password
            </button>
          </div>

          {/* Tab Form Contents */}
          <div className="p-6 sm:p-8">
            {activeTab === 'details' ? (
              <ProfileDetailsForm
                currentUser={currentUser}
                onSubmit={handleUpdateProfile}
                loading={loading}
              />
            ) : (
              <ChangePasswordForm
                onSubmit={handleChangePassword}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
