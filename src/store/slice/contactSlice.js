import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const API_ENDPOINT = process.env.REACT_APP_API_BASE_URL;

const INIT_STATE = {
  contact_list: [],
  isLoading: false,
  error: null,
  searchData: "",
};

// For creating new contact -> AsynThunk is used for API

export const createContact = createAsyncThunk(
  "createContact",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// For reading All the contact list from API - AsyncThunk is used For API

export const getContactList = createAsyncThunk(
  "getContactList",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/employee`);
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// For updaing contact details of single user from API - AsyncThunk is used For API
export const updateContactDetails = createAsyncThunk(
  "updateContactDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/employee/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// For Deleting contact details of single user from API - AsyncThunk is used For API
export const deleteContactDetails = createAsyncThunk(
  "deleteContactDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/employee/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const contactSlice = createSlice({
  name: "contactList",
  initialState: INIT_STATE,
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact_list.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getContactList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactList.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.contact_list = action.payload;
        state.contact_list = action.payload.sort((a, b) => {
          return Number(b.id) - Number(a.id); // Sorting by id in descending order (converted to number)
        });
      })
      .addCase(getContactList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateContactDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContactDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact_list = state.contact_list.map((details) =>
          details.id == action.payload.id ? action.payload : details
        );
      })
      .addCase(updateContactDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContactDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContactDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.id) {
          state.contact_list = state.contact_list.filter(
            (item) => item.id !== action.payload.id
          );
        }
      })
      .addCase(deleteContactDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default contactSlice.reducer;
export const { searchUser } = contactSlice.actions;
