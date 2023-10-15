import React, { Component } from 'react';
import Currency from "./Currency";
import SliderComponent from "./SliderComponent";
import './App.css';

class PartnerForm extends Component {

  constructor(props) {
    super(props);

    this.timeOptions = [];

    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : `${i}`;
      this.timeOptions.push(`${hour}:00`);
    };

    this.state = {
      formData: {
        slug: '',
        accountId: '',
        partnerName: '',
        config: {
          appConfirmationUrl: ``,
          autoConfirm: true,
          bannerImage: '',
          categories: [''],
          clientSlug: '',
          currencyConfig: 'USD - United States Dollar',
          customerSmsNotificationEnable: true,
          live: true,
          openingHours: {
            Monday: { openingTime: "09:00", closingTime: "18:00" },
            Tuesday: { openingTime: "09:00", closingTime: "18:00" },
            Wednesday: { openingTime: "09:00", closingTime: "18:00" },
            Thursday: { openingTime: "09:00", closingTime: "18:00" },
            Friday: { openingTime: "09:00", closingTime: "18:00" },
            Saturday: { openingTime: "09:00", closingTime: "18:00" },
            Sunday: { openingTime: "09:00", closingTime: "18:00" },
          },
          ordering: true,
          partnerPhoneNumber: '',
          partnerSmsNotificationEnabled: true,
          pushNotificationEnabled: true,
          searchText: 'Search Our Menu',
        },
      },
    };
  }

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: type === 'checkbox' ? checked : value,
      },
    }), () => {
      if (name === 'slug') {
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            config: {
              ...prevState.formData.config,
              appConfirmationUrl: value + '/confirmation'
            }
          }
        }))
      }
    });
  };

  handleConfigChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        config: {
          ...prevState.formData.config,
          [name]: type === "checkbox" ? checked : value,
        }
      }
    }))
  }

  addCategories = () => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        config: {
          ...prevState.formData.config,
          categories: [...prevState.formData.config.categories, ''],
        }
      }
    }));
  }

  handleCategoriesChange = (event, index) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        config: {
          ...prevState.formData.config,
          categories: prevState.formData.config.categories.map((el, ind) => index === ind ? value : el)
        }
      }
    }));
  }

  handleSlider = (name) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        config: {
          ...prevState.formData.config,
          [name]: !prevState.formData.config[name],
        }
      }
    }));
  };

  handleCurrencyChange = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        config: {
          ...prevState.formData.config,
          currencyConfig: value,
        }
      }
    }));
  };

  handleOpeningHoursChange = (day, status, hours) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        config: {
          ...prevState.formData.config,
          openingHours: {
            ...prevState.formData.config.openingHours,
            [day]: {
              ...prevState.formData.config.openingHours[day],
              [status]: hours
            }
          },
        },
      },
    }));
  };

  handleSubmit = () => {

    const apiEndpoint = 'api';
    const { formData } = this.state;

    const withConvertedTimes = Object.values(formData.config.openingHours).reduce((curr, next, index, arr) => {
      const fullTime = `${next['openingTime']}-${next["closingTime"]}`;
      return curr + fullTime + `${index === (arr.length - 1) ? '' : ","}`;
    }, "");

    const body = {
      ...formData, config: {
        ...formData.config,
        openingHours: withConvertedTimes
      }
    }

    fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data sent successfully:', data);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  render() {
    const { formData } = this.state;

    return (
      <div className="partner-form-container">
        <form className="partner-form">
          <h2>Partner Information</h2>

          <div className="form-group">
            <label htmlFor="slug">Slug:</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="partnerName">Partner Name:</label>
            <input
              type="text"
              id="partnerName"
              name="partnerName"
              value={formData.partnerName}
              onChange={this.handleInputChange}
            />
          </div>

          <h3>Settings</h3>

          <div className="form-group">
            <label htmlFor="bannerImage">Banner Image:</label>
            <input
              type="text"
              id="bannerImage"
              name="bannerImage"
              value={formData.config.bannerImage}
              onChange={this.handleConfigChange}
            />
          </div>

          {this.state.formData.config.categories.map((input, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={`categories${index}`}>{index === 0 ? `Categories:` : `Extra Category`}</label>
              <input
                type="text"
                id={`categories${index}`}
                name={`categories${index}`}
                value={input}
                onChange={(e) => this.handleCategoriesChange(e, index)}
              />
            </div>
          ))}
          <button type="button" onClick={this.addCategories}>Add More</button>

          <div className="form-group">
            <label htmlFor="clientSlug">Client Slug:</label>
            <input
              type="text"
              id="clientSlug"
              name="clientSlug"
              value={formData.config.clientSlug}
              onChange={this.handleConfigChange}
            />
          </div>

          <SliderComponent name={"autoConfirm"} handleSlider={this.handleSlider} status={formData.config["autoConfirm"]} />

          <SliderComponent name={"customerSmsNotificationEnable"} handleSlider={this.handleSlider} status={formData.config["customerSmsNotificationEnable"]} />

          <SliderComponent name={"ordering"} handleSlider={this.handleSlider} status={formData.config["ordering"]} />

          <SliderComponent name={"live"} handleSlider={this.handleSlider} status={formData.config["live"]} />

          <SliderComponent name={"partnerSmsNotificationEnabled"} handleSlider={this.handleSlider} status={formData.config["partnerSmsNotificationEnabled"]} />

          <SliderComponent name={"pushNotificationEnabled"} handleSlider={this.handleSlider} status={formData.config["pushNotificationEnabled"]} />

          <Currency getCurrent={this.handleCurrencyChange} />

          {
            Object.keys(this.state.formData.config.openingHours).map((day, index) => (
              <div key={day + index}>
                <div className="form-group" >
                  <label htmlFor="openingHours-Monday">{`Opening Hours (${day}):`}</label>
                  <select
                    value={formData.config.openingHours[day].openingTime}
                    onChange={(e) => this.handleOpeningHoursChange(day, "openingTime", e.target.value)}
                  >
                    <option value="">Select Time</option>
                    {this.timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group" >
                  <label htmlFor="closingHours-Monday">{`closing Hours (${day}):`}</label>
                  <select
                    value={formData.config.openingHours[day].closingTime}
                    onChange={(e) => this.handleOpeningHoursChange(day, "closingTime", e.target.value)}
                  >
                    <option value="">Select Time</option>
                    {this.timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          }

          <button type="button" className="submit-button" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PartnerForm;
