import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
  const style = {

  };
  return (
    <React.Fragment>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555', border: '4px solid #FFF' }}
      />
      <div style={style} className="filterNode">
        {/* {data.label} */}
        <svg width="100" height="100" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M53 0H10C4.47715 0 0 4.47715 0 10V53C0 58.5228 4.47715 63 10 63H53C58.5228 63 63 58.5228 63 53V10C63 4.47715 58.5228 0 53 0Z" fill="#4ACB69" />
          <g clip-path="url(#clip0_28807_10446)">
            <path d="M32.9989 41.892H24.4683C24.1065 41.892 23.8883 41.6821 23.7903 41.5571C23.6213 41.3411 23.5559 41.06 23.6109 40.7857C24.491 36.3929 28.2219 33.1852 32.529 33.0811C32.6005 33.0839 32.6723 33.0858 32.7446 33.0858C35.9223 33.0858 38.5077 30.3996 38.5077 27.0976C38.5077 23.7956 35.9223 21.1094 32.7446 21.1094C29.5668 21.1094 26.9816 23.7956 26.9816 27.0976C26.9816 29.0573 27.8923 30.8003 29.2972 31.8933C28.0102 32.3335 26.8023 33.0182 25.7454 33.9215C23.8075 35.5778 22.4601 37.8881 21.9515 40.4267C21.7921 41.2222 21.9831 42.0392 22.4754 42.6684C22.9652 43.2942 23.6917 43.6532 24.4683 43.6532H32.9989C33.4669 43.6532 33.8464 43.259 33.8464 42.7726C33.8464 42.2862 33.4669 41.892 32.9989 41.892ZM28.6766 27.0976C28.6766 24.7669 30.5014 22.8706 32.7446 22.8706C34.9877 22.8706 36.8127 24.7669 36.8127 27.0976C36.8127 29.3949 35.0397 31.27 32.8408 31.3233C32.8092 31.3196 32.7773 31.3171 32.7446 31.3171C32.6784 31.3171 32.6124 31.3182 32.5463 31.3194C30.395 31.2117 28.6766 29.3593 28.6766 27.0976Z" fill="#C2FFD1" />
            <path d="M17.4803 37.5271L17.4196 37.8267H17.7253H18.8933C19.1712 37.8267 19.4377 37.9371 19.6341 38.1336C19.8306 38.33 19.941 38.5965 19.941 38.8744C19.941 39.1523 19.8306 39.4188 19.6341 39.6153C19.4377 39.8118 19.1712 39.9222 18.8933 39.9222H16.2978C16.0199 39.9222 15.7534 39.8118 15.5569 39.6153C15.3604 39.4188 15.25 39.1523 15.25 38.8744L15.25 38.874C15.2474 37.1959 15.7237 35.5519 16.623 34.1351C17.5223 32.7183 18.8073 31.5875 20.3269 30.8757L20.6324 30.7326L20.4066 30.482C19.8076 29.8169 19.4014 29.001 19.2318 28.1221C19.0622 27.2433 19.1355 26.3348 19.444 25.4946C19.7525 24.6544 20.2844 23.9142 20.9824 23.3539C21.6805 22.7937 22.5181 22.4344 23.4052 22.315L23.4052 22.3151L23.4129 22.3138C23.5518 22.2907 23.6938 22.2957 23.8307 22.3287C23.9675 22.3617 24.0963 22.4219 24.2093 22.5057L24.357 22.3066L24.2093 22.5057C24.3224 22.5895 24.4174 22.6953 24.4887 22.8167L24.7042 22.69L24.4887 22.8167C24.5599 22.938 24.6061 23.0725 24.6242 23.2121C24.6424 23.3516 24.6322 23.4934 24.5944 23.629C24.5566 23.7646 24.4918 23.8911 24.404 24.0011C24.3162 24.1111 24.2071 24.2022 24.0832 24.2691C23.9594 24.336 23.8234 24.3773 23.6832 24.3905L23.6832 24.3902L23.6713 24.3919C22.9966 24.4883 22.3794 24.8248 21.9329 25.3397C21.4864 25.8545 21.2405 26.5131 21.2405 27.1947C21.2405 27.8762 21.4864 28.5348 21.9329 29.0496C22.3794 29.5645 22.9966 29.901 23.6713 29.9974L23.6713 29.9974L23.6732 29.9977C23.936 30.0331 24.1755 30.1669 24.3435 30.3719C24.5116 30.577 24.5956 30.8381 24.5788 31.1027C24.5619 31.3673 24.4453 31.6157 24.2526 31.7977C24.0599 31.9798 23.8053 32.082 23.5401 32.0838L23.5064 32.084L23.4739 32.0932L23.4739 32.0932L23.4738 32.0932L23.4736 32.0932L23.4727 32.0935L23.4692 32.0945L23.4557 32.0983L23.406 32.1121C23.3642 32.1238 23.307 32.1396 23.2454 32.1562C23.1205 32.19 22.9887 32.2243 22.9249 32.2372C21.5907 32.4676 20.3571 33.0955 19.3857 34.0387C18.4134 34.9829 17.7492 36.1988 17.4803 37.5271Z" fill="#C2FFD1" stroke="#4ACB69" stroke-width="0.5" />
            <path d="M42.0674 47.0243C45.8961 47.0243 48.9999 43.9205 48.9999 40.0918C48.9999 36.263 45.8961 33.1592 42.0674 33.1592C38.2386 33.1592 35.1348 36.263 35.1348 40.0918C35.1348 43.9205 38.2386 47.0243 42.0674 47.0243Z" fill="#C2FFD1" stroke="#4ACB69" stroke-width="2" />
          </g>
          <defs>
            <clipPath id="clip0_28807_10446">
              <rect width="35" height="35" fill="white" transform="translate(14 14)" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <Handle
        type="source"
        position="right"
        style={{ background: '#555', border: '4px solid #FFF' }}
      />
      <span className='autoTitle'>Filter</span>
      {data.metrics ?
        <span className='metric'>
          <svg width="100" height="100" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M53 0H10C4.47715 0 0 4.47715 0 10V53C0 58.5228 4.47715 63 10 63H53C58.5228 63 63 58.5228 63 53V10C63 4.47715 58.5228 0 53 0Z" fill="#4ACB69" />
            <g clip-path="url(#clip0_28807_10446)">
              <path d="M32.9989 41.892H24.4683C24.1065 41.892 23.8883 41.6821 23.7903 41.5571C23.6213 41.3411 23.5559 41.06 23.6109 40.7857C24.491 36.3929 28.2219 33.1852 32.529 33.0811C32.6005 33.0839 32.6723 33.0858 32.7446 33.0858C35.9223 33.0858 38.5077 30.3996 38.5077 27.0976C38.5077 23.7956 35.9223 21.1094 32.7446 21.1094C29.5668 21.1094 26.9816 23.7956 26.9816 27.0976C26.9816 29.0573 27.8923 30.8003 29.2972 31.8933C28.0102 32.3335 26.8023 33.0182 25.7454 33.9215C23.8075 35.5778 22.4601 37.8881 21.9515 40.4267C21.7921 41.2222 21.9831 42.0392 22.4754 42.6684C22.9652 43.2942 23.6917 43.6532 24.4683 43.6532H32.9989C33.4669 43.6532 33.8464 43.259 33.8464 42.7726C33.8464 42.2862 33.4669 41.892 32.9989 41.892ZM28.6766 27.0976C28.6766 24.7669 30.5014 22.8706 32.7446 22.8706C34.9877 22.8706 36.8127 24.7669 36.8127 27.0976C36.8127 29.3949 35.0397 31.27 32.8408 31.3233C32.8092 31.3196 32.7773 31.3171 32.7446 31.3171C32.6784 31.3171 32.6124 31.3182 32.5463 31.3194C30.395 31.2117 28.6766 29.3593 28.6766 27.0976Z" fill="#C2FFD1" />
              <path d="M17.4803 37.5271L17.4196 37.8267H17.7253H18.8933C19.1712 37.8267 19.4377 37.9371 19.6341 38.1336C19.8306 38.33 19.941 38.5965 19.941 38.8744C19.941 39.1523 19.8306 39.4188 19.6341 39.6153C19.4377 39.8118 19.1712 39.9222 18.8933 39.9222H16.2978C16.0199 39.9222 15.7534 39.8118 15.5569 39.6153C15.3604 39.4188 15.25 39.1523 15.25 38.8744L15.25 38.874C15.2474 37.1959 15.7237 35.5519 16.623 34.1351C17.5223 32.7183 18.8073 31.5875 20.3269 30.8757L20.6324 30.7326L20.4066 30.482C19.8076 29.8169 19.4014 29.001 19.2318 28.1221C19.0622 27.2433 19.1355 26.3348 19.444 25.4946C19.7525 24.6544 20.2844 23.9142 20.9824 23.3539C21.6805 22.7937 22.5181 22.4344 23.4052 22.315L23.4052 22.3151L23.4129 22.3138C23.5518 22.2907 23.6938 22.2957 23.8307 22.3287C23.9675 22.3617 24.0963 22.4219 24.2093 22.5057L24.357 22.3066L24.2093 22.5057C24.3224 22.5895 24.4174 22.6953 24.4887 22.8167L24.7042 22.69L24.4887 22.8167C24.5599 22.938 24.6061 23.0725 24.6242 23.2121C24.6424 23.3516 24.6322 23.4934 24.5944 23.629C24.5566 23.7646 24.4918 23.8911 24.404 24.0011C24.3162 24.1111 24.2071 24.2022 24.0832 24.2691C23.9594 24.336 23.8234 24.3773 23.6832 24.3905L23.6832 24.3902L23.6713 24.3919C22.9966 24.4883 22.3794 24.8248 21.9329 25.3397C21.4864 25.8545 21.2405 26.5131 21.2405 27.1947C21.2405 27.8762 21.4864 28.5348 21.9329 29.0496C22.3794 29.5645 22.9966 29.901 23.6713 29.9974L23.6713 29.9974L23.6732 29.9977C23.936 30.0331 24.1755 30.1669 24.3435 30.3719C24.5116 30.577 24.5956 30.8381 24.5788 31.1027C24.5619 31.3673 24.4453 31.6157 24.2526 31.7977C24.0599 31.9798 23.8053 32.082 23.5401 32.0838L23.5064 32.084L23.4739 32.0932L23.4739 32.0932L23.4738 32.0932L23.4736 32.0932L23.4727 32.0935L23.4692 32.0945L23.4557 32.0983L23.406 32.1121C23.3642 32.1238 23.307 32.1396 23.2454 32.1562C23.1205 32.19 22.9887 32.2243 22.9249 32.2372C21.5907 32.4676 20.3571 33.0955 19.3857 34.0387C18.4134 34.9829 17.7492 36.1988 17.4803 37.5271Z" fill="#C2FFD1" stroke="#4ACB69" stroke-width="0.5" />
              <path d="M42.0674 47.0243C45.8961 47.0243 48.9999 43.9205 48.9999 40.0918C48.9999 36.263 45.8961 33.1592 42.0674 33.1592C38.2386 33.1592 35.1348 36.263 35.1348 40.0918C35.1348 43.9205 38.2386 47.0243 42.0674 47.0243Z" fill="#C2FFD1" stroke="#4ACB69" stroke-width="2" />
            </g>
            <defs>
              <clipPath id="clip0_28807_10446">
                <rect width="35" height="35" fill="white" transform="translate(14 14)" />
              </clipPath>
            </defs>
          </svg>

          <span>{data.metrics.success}</span>
        </span>
        : ""}
    </React.Fragment>
  );
});
